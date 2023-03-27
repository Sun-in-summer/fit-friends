import { CRUDRepository } from '@fitfriends/core';
import { FitTrainingEntity } from './fit-training.entity'
import { Training } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TrainingQuery } from './query/training.query';
import { Price, Rating } from '@fitfriends/shared-constants';


@Injectable()
export class FitTrainingRepository implements CRUDRepository<FitTrainingEntity, number, Training> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FitTrainingEntity): Promise<Training> {
      const entityData = item.toObject();
      return this.prisma.training.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.training.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Training | null> {
    return this.prisma.training.findFirst({
      where: {
        id
      },
      include: { reviews: true}
    });
  }


  public find(query: TrainingQuery): Promise<Training[]> {
    const {
      priceMin,
      priceMax,
      ratingMax,
      ratingMin,
      trainingTime,
      limit,
      page,
      sortDirection,
      sortBy,
      trainingType,


    } = query;

    return this.prisma.training.findMany({
      where: {
        trainingTime: { in: trainingTime },
        AND: [
          {
            price: {
              gte: priceMin
            }
          },
          {
            price: {
              lte: priceMax ?? Price.Max
            }
          },
          {
            rating: {
              gte: ratingMin ?? Rating.Min
            }
          },
          {
            rating: {
              lte: ratingMax ?? Rating.Max
            }
          }
        ],
      },
      orderBy: {
        [sortBy]: sortDirection,
      },
      include: {
        reviews: true,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<FitTrainingEntity>): Promise<Training> {
    return this.prisma.training.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
