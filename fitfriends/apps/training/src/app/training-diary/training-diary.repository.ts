import { CRUDRepository } from '@fitfriends/core';
import { TrainingDiary } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TrainingDiaryEntity } from './training-diary.entity';
import { TrainingDiaryQuery } from './query/training-diary.query';



@Injectable()
export class TrainingDiaryRepository implements CRUDRepository<TrainingDiaryEntity, number, TrainingDiary> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TrainingDiaryEntity): Promise<TrainingDiary> {
      const entityData = item.toObject();
      return this.prisma.trainingDiary.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainingDiary.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<TrainingDiary | null> {
    return this.prisma.trainingDiary.findFirst({
      where: {
        id
      },
    });
  }



  public find(userId : string, query?: TrainingDiaryQuery, ): Promise<TrainingDiary[]> {
    const {
      limit,
      page,
    } = query;

    return this.prisma.trainingDiary.findMany({
      where: {
        userId: userId,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<TrainingDiaryEntity>): Promise<TrainingDiary> {
    return this.prisma.trainingDiary.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
