import { Module } from '@nestjs/common';
import { FitTrainingController } from './fit-training.controller';
import { FitTrainingRepository } from './fit-training.repository';
import { FitTrainingService } from './fit-training.service';

@Module({
  controllers: [FitTrainingController],
  providers: [FitTrainingService, FitTrainingRepository],
  exports: [FitTrainingRepository]
})
export class FitTrainingModule {}
