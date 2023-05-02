import { Review } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';



@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = new ReviewEntity(dto);
    return this.reviewRepository.create(reviewEntity);
  }

  async deleteReview(id: number): Promise<void> {
    this.reviewRepository.destroy(id);
  }

  async getReview(id: number): Promise<Review> {
    return this.reviewRepository.findById(id);
  }

  async getReviewsByTrainingId(trainingId: number): Promise<Review[]> {
    return this.reviewRepository.findByTrainingId(trainingId);
  }

   async getReviewsByUserId(userId: string): Promise<Review[]> {
    return this.reviewRepository.findByUserId(userId);
  }

  async updateReview(id: number, dto: CreateReviewDto): Promise<Review> {
    return this.reviewRepository.update(id, new ReviewEntity(dto));
  }

}
