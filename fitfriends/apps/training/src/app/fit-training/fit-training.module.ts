import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FitTrainingController } from './fit-training.controller';
import { FitTrainingRepository } from './fit-training.repository';
import { FitTrainingService } from './fit-training.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [FitTrainingController],
  providers: [FitTrainingService, FitTrainingRepository, JwtAuthGuard],
  exports: [FitTrainingRepository]
})
export class FitTrainingModule {}
