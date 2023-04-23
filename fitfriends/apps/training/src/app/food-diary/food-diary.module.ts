import { Module } from '@nestjs/common';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryController } from './food-diary.controller';
import { FoodDiaryService } from './food-diary.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TraineeRoleStrategy } from '../strategies/trainee-role.strategy';

@Module({
  imports: [],
  controllers: [FoodDiaryController],
  providers: [
    FoodDiaryService,
    FoodDiaryRepository,
    JwtStrategy,
    TraineeRoleStrategy],
  exports: [FoodDiaryRepository]
})
export class FoodDiaryModule {}
