import { Module } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TraineeRoleStrategy } from '../strategies/trainee-role.strategy';
import { TrainingDiaryController } from './training-diary.controller';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryRepository } from './training-diary.repository';

@Module({
  imports: [],
  controllers: [TrainingDiaryController],
  providers: [
    TrainingDiaryService,
    TrainingDiaryRepository,
    JwtStrategy,
    TraineeRoleStrategy],
  exports: [TrainingDiaryRepository]
})
export class TrainingDiaryModule {}
