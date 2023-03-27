import { Module } from '@nestjs/common';
import { FitTrainingModule } from './fit-training/fit-training.module';
import { OrderModule } from './order/order.module';
import { GymModule } from './gym/gym.module';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { jwtOptions } from './config/jwt.config';

@Module({
  imports: [    PrismaModule, FitTrainingModule, OrderModule, GymModule, ReviewModule,
  ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions],
    })],
  controllers: [],
  providers: [
    JwtStrategy
  ],
})
export class AppModule {}
