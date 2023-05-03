import { Module } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { FitTrainingModule } from '../fit-training/fit-training.module';


@Module({
  imports: [FitTrainingModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository]
})
export class ReviewModule {}
