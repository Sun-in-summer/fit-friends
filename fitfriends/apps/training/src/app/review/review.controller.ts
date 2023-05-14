import { Body, Post, Controller,  Param, HttpCode, HttpStatus, Get, Patch, Req, } from '@nestjs/common';
import { fillObject,  } from '@fitfriends/core';
import { ReviewService } from './review.service';
import { CreatedReviewRdo } from './rdo/created-review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';


@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @Get('/trainings/:id')
  async show(@Param('id') id: string) {
    const trainingId = parseInt(id, 10);
    const reviews = await this.reviewService.getReviewsByTrainingId(trainingId);
    return fillObject(CreatedReviewRdo, reviews);
  }

  @Get('/users/:userId')
  async index(@Param('userId') userId: string) {
    const reviews = await this.reviewService.getReviewsByUserId(userId);
    return fillObject(CreatedReviewRdo, reviews);
  }

  @Post('/')
  async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.createReview(dto);
    return fillObject(CreatedReviewRdo, newReview);
  }


  @Get('/')
  async showAll() {
    const reviews = await this.reviewService.getAllReviews();
    return fillObject(CreatedReviewRdo, reviews);
  }


}



