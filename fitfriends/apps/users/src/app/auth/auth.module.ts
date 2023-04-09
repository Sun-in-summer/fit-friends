import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../config/jwt.config';
import { FitUserModule } from '../fit-user/fit-user.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { TraineeRoleStrategy } from './strategies/trainee-role.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './auth.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';


@Module({
  imports: [
    FitUserModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('multer.uploadDirectory')
      }),
      inject: [ConfigService]
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    TraineeRoleStrategy
   ],
})
export class AuthModule {}
