import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { FitUserMemoryRepository } from '../fit-user/fit-user-memory.repository';
import { FitUserEntity } from '../fit-user/fit-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly fitUserRepository: FitUserMemoryRepository
  ) {}

  async register(dto: CreateUserDto){
    const {email, firstname, password, dateBirth, role, avatar, gender, location, traineeOrCoach } = dto;
    const fitUser = {
      email,
      firstname,
      role,
      avatar,
      dateBirth: dayjs(dateBirth).toDate(),
      gender,
      location,
      traineeOrCoach,
      passwordHash: ''
    };

    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new FitUserEntity(fitUser)
    .setPassword(password);

    return this.fitUserRepository.create(userEntity);
  }

  async verifyUser(dto:LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if(!existUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const fitUserEntity = new FitUserEntity(existUser);
    if (!await fitUserEntity.comparePassword(password)){
      throw new Error (AUTH_USER_PASSWORD_WRONG)
    }

    return fitUserEntity.toObject();
  }


  async getUser(id: string) {
    return this.fitUserRepository.findById(id);
  }


}

