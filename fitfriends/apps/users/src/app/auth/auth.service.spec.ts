import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import { FitUserRepository } from '../fit-user/fit-user.repository';
import { FitUserService } from '../fit-user/fit-user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ_SERVICE } from './auth.constant';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';
import { jwtOptions } from '../../config/jwt.config';

describe('AuthService', () => {
  let authService: AuthService;

  const FitUsersRepositoryProvider = {
    provide: FitUserRepository,
    useFactory: () => ({
      register: jest.fn(),
      getUsers: jest.fn(),
      getFriends: jest.fn(),
      getUser: jest.fn(),
      findByEmail: jest.fn(),
      updateUser: jest.fn(),
    })
  };

  const RefreshTokenRepositoryProvider = {
    provide: RefreshTokenRepository,
    useFactory: () => ({
        findByTokenId: jest.fn(),
        deleteExpiredTokens: jest.fn(),
        create: jest.fn(),
        deleteByTokenId: jest.fn()
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        FitUserRepository,
        FitUserService,
        JwtService,
        RefreshTokenService,
        ConfigService,
        FitUsersRepositoryProvider, {
          provide: RABBITMQ_SERVICE,
          useValue: {
            getResult: jest.fn()
          }
        },
        RefreshTokenRepositoryProvider, {
          provide: jwtOptions.KEY,
          useValue: {
            getResult: jest.fn()
          }
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
