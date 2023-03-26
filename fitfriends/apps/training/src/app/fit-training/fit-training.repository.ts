import { CRUDRepository } from '@fitfriends/core';
import { FitTrainingEntity } from './fit-training.entity'
import { Training } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
      }
    });
  }

  public find(ids: number[] = []): Promise<Training[]> {
    return this.prisma.training.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(): Promise<Training> {
    throw new Error('the method is not  implemented yet')
  }
}
