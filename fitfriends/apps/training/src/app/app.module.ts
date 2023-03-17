import { Module } from '@nestjs/common';
import { FitTrainingModule } from './fit-training/fit-training.module';
import { OrderModule } from './order/order.module';
import { GymModule } from './gym/gym.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [FitTrainingModule, OrderModule, GymModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
