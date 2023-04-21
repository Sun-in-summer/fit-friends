import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch,  Req  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { RequestWithTokenPayload, TokenPayload } from '@fitfriends/shared-types';
import { CreatedFoodDiaryRdo } from './rdo/created-food-diary.rdo';
import { FoodDiaryService } from './food-diary.service';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';


@Controller('food-diary')
export class FoodDiaryController {
  constructor(
    private readonly foodDiaryService: FoodDiaryService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const foodDiaryId = parseInt(id, 10);
    const existFoodDiary = await this.foodDiaryService.getFoodDiaryById(foodDiaryId);
    return fillObject(CreatedFoodDiaryRdo, existFoodDiary);
  }


  @Post('/')
  async create(@Body() dto: CreateFoodDiaryDto, @Param('id') userId: string) {
    const newCategory = await this.foodDiaryService.createFoodDiary(dto, userId);
    return fillObject(CreatedFoodDiaryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const foodDiaryId = parseInt(id, 10);
    this.foodDiaryService.deleteFoodDiary(foodDiaryId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateFoodDiaryDto, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const foodDiaryId = parseInt(id, 10);
    const updatedFoodDiary = await this.foodDiaryService.updateFoodDiary(foodDiaryId, dto, userId)
    return fillObject(CreatedFoodDiaryRdo, updatedFoodDiary);
  }

}



