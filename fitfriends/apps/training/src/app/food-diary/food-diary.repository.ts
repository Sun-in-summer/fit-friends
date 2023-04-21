import { CRUDRepository } from '@fitfriends/core';
import { FoodDiary } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FoodDiaryEntity } from './food-diary.entity';
import { FoodDiaryQuery } from './query/food-diary.query';


@Injectable()
export class FoodDiaryRepository implements CRUDRepository<FoodDiaryEntity, number, FoodDiary> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FoodDiaryEntity): Promise<FoodDiary> {
      const entityData = item.toObject();
      return this.prisma.foodDiary.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.foodDiary.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<FoodDiary | null> {
    return this.prisma.foodDiary.findFirst({
      where: {
        id
      },
    });
  }



  public find(query: FoodDiaryQuery, userId : string): Promise<FoodDiary[]> {
    const {
      limit,
      page,
    } = query;

    return this.prisma.foodDiary.findMany({
      where: {
        userId: userId,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<FoodDiaryEntity>): Promise<FoodDiary> {
    return this.prisma.foodDiary.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
