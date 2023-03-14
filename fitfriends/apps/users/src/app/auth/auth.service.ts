import { RefreshTokenPayload, TokenPayload, User } from '@fitfriends/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { jwtOptions } from '../../config/jwt.config';
import { FitUserEntity } from '../fit-user/fit-user.entity';
import { FitUserRepository } from '../fit-user/fit-user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserExistsException, UserNotFoundException, UserNotRegisteredException, UserPasswordWrongException } from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  async register(dto: CreateUserDto){
    const {email, firstname, password, dateBirth, role, avatar, gender, place, traineeOrCoach } = dto;
    const fitUser = {
      email,
      firstname,
      role,
      avatar,
      dateBirth: dayjs(dateBirth).toDate(),
      gender,
      place,
      passwordHash: '',
      traineeOrCoach: {...traineeOrCoach}

    };

    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new UserExistsException(email);
    }

    const userEntity = await new FitUserEntity(fitUser)
    .setPassword(password);

    return this.fitUserRepository.create(userEntity);
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


}

