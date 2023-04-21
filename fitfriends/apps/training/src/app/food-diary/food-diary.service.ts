import { FoodDiary } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryEntity } from './food-diary.entity';
import { FoodDiaryQuery } from './query/food-diary.query';

@Injectable()
export class FoodDiaryService {
  constructor(
    private readonly foodDiaryRepository: FoodDiaryRepository
  ) {}

  async createFoodDiary(dto: CreateFoodDiaryDto, userId: string): Promise<FoodDiary> {


    const foodDiaryEntity = new FoodDiaryEntity({...dto, userId: userId } );
    return this.foodDiaryRepository.create(foodDiaryEntity);
  }

  async deleteFoodDiary(id: number): Promise<void> {
    this.foodDiaryRepository.destroy(id);
  }



   async getFoodDiaryById(id: number, ): Promise<FoodDiary> {
    const foodDiary = this.foodDiaryRepository.findById(id);
    return  foodDiary;
  }



  async getFoodDiariesByUserId(query: FoodDiaryQuery, userId: string): Promise<FoodDiary[]> {
    return this.foodDiaryRepository.find(query, userId);
  }

  async updateFoodDiary(id: number, dto: CreateFoodDiaryDto, userId: string): Promise<FoodDiary> {
    const existFoodDiary= await this.getFoodDiaryById(id);

    if (existFoodDiary.userId !== userId) {
      throw new ForbiddenException('Редактировать дневник питания может только его автор');
    }

    return this.foodDiaryRepository.update(id, new FoodDiaryEntity(dto));
  }

}
