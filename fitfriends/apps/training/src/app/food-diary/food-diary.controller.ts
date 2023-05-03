import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch,  Req, UseGuards, Query, RawBodyRequest  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { TokenPayload } from '@fitfriends/shared-types';
import { CreatedFoodDiaryRdo } from './rdo/created-food-diary.rdo';
import { FoodDiaryService } from './food-diary.service';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TraineeRoleGuard } from '../guards/trainee-role.guard';
import { FoodDiaryQuery } from './query/food-diary.query';


@Controller('food-diary')
export class FoodDiaryController {
  constructor(
    private readonly foodDiaryService: FoodDiaryService
  ) {}



  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Post('/')
  async create(@Body() dto: CreateFoodDiaryDto, @Req()
req: RawBodyRequest<{user: TokenPayload}>) {
    const userId = req.user.sub;
    const newCategory = await this.foodDiaryService.createFoodDiary(dto, userId);
    return fillObject(CreatedFoodDiaryRdo, newCategory);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/')
  async getFoodDiariesForUser(@Query () query: FoodDiaryQuery, @Req()
req: RawBodyRequest<{user: TokenPayload}>) {
    const userId = req.user.sub;
    const existFoodDiary = await this.foodDiaryService.getFoodDiariesByUserId(userId, query);
    return fillObject(CreatedFoodDiaryRdo, existFoodDiary);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/:id')
  async getFoodDiaryById(@Param('id')
id: string) {
    const foodDiaryId = parseInt(id, 10);
    const existFoodDiary = await this.foodDiaryService.getFoodDiaryById(foodDiaryId);
    return fillObject(CreatedFoodDiaryRdo, existFoodDiary);
  }


  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const foodDiaryId = parseInt(id, 10);
    this.foodDiaryService.deleteFoodDiary(foodDiaryId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateFoodDiaryDto, @Req()
req: RawBodyRequest<{user: TokenPayload}>) {
    const userId = req.user.sub;
    const foodDiaryId = parseInt(id, 10);
    const updatedFoodDiary = await this.foodDiaryService.updateFoodDiary(foodDiaryId, dto, userId)
    return fillObject(CreatedFoodDiaryRdo, updatedFoodDiary);
  }

}



