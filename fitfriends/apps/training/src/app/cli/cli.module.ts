
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from '../app.constant';
import { jwtOptions } from '../config/jwt.config';
import { PrismaModule } from '../prisma/prisma.module';
import { FitTrainingModule } from '../fit-training/fit-training.module';
import { OrderModule } from '../order/order.module';
import { GymModule } from '../gym/gym.module';
import { FoodDiaryModule } from '../food-diary/food-diary.module';
import { TrainingDiaryModule } from '../training-diary/training-diary.module';
import { CliService } from './cli.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions],
    }),

    PrismaModule,
    FitTrainingModule,
    OrderModule,
    GymModule,
    FoodDiaryModule,
    TrainingDiaryModule,
  ],
  providers: [CliService],
})
export class CliModule {}
