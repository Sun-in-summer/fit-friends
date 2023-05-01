import { CommandEvent, RefreshTokenPayload, TokenPayload, User } from '@fitfriends/shared-types';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { jwtOptions } from '../../config/jwt.config';
import { FitUserNewModel } from '../fit-user/fit-user-new.model';
import { FitUserEntity } from '../fit-user/fit-user.entity';
import { FitUserRepository } from '../fit-user/fit-user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { CreateUserNewDto } from './dto/create-user-new.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserExistsException, UserNotFoundException, UserNotRegisteredException, UserPasswordWrongException } from './exceptions';
import {UserQuery} from './query/user.query';
import * as fs from 'fs';
import { DEFAULT_AVATAR_FILE_NAME } from '@fitfriends/shared-constants';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './auth.constant';
import { createEvent } from '@fitfriends/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async register(dto: CreateUserNewDto
    ){

    const {email, password, dateBirth  } = dto;

  const passwordToSave= password;

  const fitUser = {
      ...dto,
      dateBirth: dayjs(dateBirth).toDate(),
      password: '',
      passwordHash: '',
      myFriends: [],
      favoriteGyms: [],
      sentRequestForFriends: [],
      gotRequestForFriends: [],
      avatar: DEFAULT_AVATAR_FILE_NAME
    };



    const existUser = await this.fitUserRepository.findByEmail(email);


    if (existUser) {
      throw new UserExistsException(email);
    }

    const userEntity = await new FitUserEntity(fitUser)
    .setPassword(passwordToSave);



    const createdUser = await  this.fitUserRepository.create(userEntity);

    this.rabbitClient.emit(
        createEvent(CommandEvent.AddSubscriber),
        {
          id: createdUser._id,
          firstname: createdUser.firstname,
          email: createdUser.email
        }
      );

    return createdUser;
  }

  async verifyUser(dto:LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if(!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const fitUserEntity = new FitUserEntity(existUser);
    if (!await fitUserEntity.comparePassword(password)){
      throw new UserPasswordWrongException();

       }
    return fitUserEntity.toObject();
  }


  async getUser(id: string) {
    const existUser = await this.fitUserRepository.findById(id);
    if (!existUser){
      throw new UserNotFoundException(id);
    }
    return existUser;
  }

  async loginUser(user: Pick<User, '_id' | 'email' | 'role' |  'firstname'>, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      firstname: user.firstname
    };

    await this.refreshTokenService.
        deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {...payload, refreshTokenId: randomUUID()}

    await this.refreshTokenService
      .createRefreshSession(refreshTokenPayload);


    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      })
    };
  }

  async updateUser(id: string, dto:CreateUserNewDto | Omit<CreateUserNewDto, 'password'> ) {

    const existUser = await this.fitUserRepository.findById(id);

    if (!existUser) {
      throw new UserExistsException(dto.email);
    }

     const updatedUserEntity = new FitUserEntity({...existUser, ...dto});
     const updatedUser =  await this.fitUserRepository.update(id, updatedUserEntity);

    return updatedUser;
  }

   async getUsers(query: UserQuery): Promise <FitUserNewModel[]>{
    return await this.fitUserRepository.find(query);
  }


   public async addFriend(userId: string, friendId: string) {
    const userData = await this.fitUserRepository.findById(userId);
    if (!friendId) {
      throw new NotFoundException('No user with such id');
    }
    const friendData = await this.fitUserRepository.findById(friendId);
    const userFriends = [...userData.myFriends];
    const friendInMyFriends = userFriends.some((id) => id === friendId);
    if (friendInMyFriends) {
      throw new BadRequestException('The user already is in friends');
    }
    const friendsOfNewFriend = [...friendData.myFriends];
    const friendsRequestsForFriendship = [...friendData.sentRequestForFriends];
    const userInFriendsFriends = friendsOfNewFriend.some((id) => id === userId);
    const userInFriendsRequestsForFriendship  = friendsRequestsForFriendship.some((id) => id === userId);
    if ( userInFriendsFriends || userInFriendsRequestsForFriendship ) {
      if (userInFriendsRequestsForFriendship) {
        friendsRequestsForFriendship.filter((id) => id!== userId);
        friendsOfNewFriend.push(userId);
        const updatedFriendEntity = new FitUserEntity({...friendData, myFriends: friendsOfNewFriend, sentRequestForFriends: friendsRequestsForFriendship});
        await this.fitUserRepository.update(friendId, updatedFriendEntity);

        this.rabbitClient.emit(
          {cmd: CommandEvent.BecameFriends},
          {
            addresseeId: friendId,
            adresseeEmail: friendData.email,
            adresseeName: friendData.firstname,
            senderId: userId,
            senderEmail: userData.email,
            senderName: userData.firstname
          }
        );
      }
      userFriends.push(friendId);
      const updatedUserEntity = new FitUserEntity({...userData, myFriends: userFriends });
      return  await this.fitUserRepository.update(userId, updatedUserEntity );
    }
    const sentRequestForFriends  =  [...userData.sentRequestForFriends];
    sentRequestForFriends.push(friendId);

    this.rabbitClient.emit(
      {cmd: CommandEvent.AddFriend},
      {
        addresseeId: friendId,
        adresseeEmail: friendData.email,
        adresseeName: friendData.firstname,
        senderId: userId,
        senderEmail: userData.email,
        senderName: userData.firstname
      }
    );
    const updatedUserEntity = new FitUserEntity({...userData, sentRequestForFriends: sentRequestForFriends });
    return  await this.fitUserRepository.update(userId, updatedUserEntity );

  }



   public async deleteFriend(userId: string, friendId: string) {
    const userData = await this.fitUserRepository.findById(userId);
    if (!friendId) {
      throw new NotFoundException('No user with such id');
    }
    const userFriends = [...userData.myFriends];
    const friendInMyFriends = userFriends.some((id) => id === friendId);
    let theRestFriends;
    if (friendInMyFriends) {
       theRestFriends = userFriends.filter((id)=> id !== friendId);
    }
    else {
      throw new NotFoundException('There was  no  friend in the list with this id');
    }
    const updatedUserEntity = new FitUserEntity({...userData, myFriends: theRestFriends });
    return  await this.fitUserRepository.update(userId, updatedUserEntity );
  }


  public async getFriends(userId: string) {
    return  await this.fitUserRepository.getFriends(userId);
  }


  public async setAvatarPath(userId: string, avatar: string) {
    const existUser = await this.fitUserRepository.findById(userId);
    const prevAvatar = existUser.avatar;

    if (fs.existsSync(prevAvatar)) {
      fs.unlink(prevAvatar, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }

    const updatedUserEntity = new FitUserEntity({...existUser, avatar});
    return this.updateUser(userId, updatedUserEntity);
  }


  public async setFile(userId: string, field: string, file: string, ) {
    const existUser = await this.fitUserRepository.findById(userId);
    const prevFile = existUser[field];

    if (fs.existsSync(prevFile)) {
      fs.unlink(prevFile, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }

    const updatedUserEntity = new FitUserEntity({...existUser, [field]: file});
    return this.updateUser(userId, updatedUserEntity );
  }


  async toggleFavoriteGym(gymId: number, id: string) {

    const existUser = await this.fitUserRepository.findById(id);

    if (!existUser) {
      throw new UserExistsException("user not found");
    }

    const userFavoriteGyms = [...existUser.favoriteGyms];
    const isGymInFavoriteGyms = userFavoriteGyms.some((id) => id === gymId);
    let filteredFavoriteGyms =[];
    if (isGymInFavoriteGyms) {
        filteredFavoriteGyms = userFavoriteGyms.filter((id) =>
        id !== gymId);
     }
    else {

       userFavoriteGyms.push(gymId);
       filteredFavoriteGyms = [...userFavoriteGyms];
    }

    const updatedUserEntity = new FitUserEntity({...existUser, favoriteGyms: filteredFavoriteGyms });
    return  await this.fitUserRepository.update(id, updatedUserEntity );
  }


  async getFavoriteGymList (userId: string){
      const existUser = await this.fitUserRepository.findById(userId);
      if (!existUser) {
      throw new UserExistsException(userId);
      }
      const usersGyms = existUser.favoriteGyms;
      return usersGyms;
  }


  async addSubscriptionOnCoach(coachId: string, userId: string) {
      const user = await this.fitUserRepository.findById(userId);
      const userEmail = user.email;

      const coach = await this.fitUserRepository.findById(coachId);
      const coachName= coach.firstname;
      this.rabbitClient.emit(
      {cmd: CommandEvent.AddSubsriptionOnCoach},
      {
        coachId: coachId,
        coachName: coachName,
        userId: userId,
        userEmail: userEmail,
      }
    );
  }


}




