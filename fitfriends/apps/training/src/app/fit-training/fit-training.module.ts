import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FitTrainingController } from './fit-training.controller';
import { FitTrainingRepository } from './fit-training.repository';
import { FitTrainingService } from './fit-training.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './fit-training.constant';
import { getNewTrainingsRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getNewTrainingsRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [FitTrainingController],
  providers: [
    FitTrainingService,
    FitTrainingRepository,
    JwtAuthGuard],
  exports: [FitTrainingRepository]
})
export class FitTrainingModule {}
