import { CRUDRepository } from '@fitfriends/core';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PersonalTrainingOrderEntity } from './personal-training-order.entity';
import { PersonalTrainingOrder } from '@fitfriends/shared-types';
import { PersonalTrainingOrderQuery } from './query/personal-training-order.query';


@Injectable()
export class PersonalTrainingOrderRepository implements CRUDRepository<PersonalTrainingOrderEntity, number, PersonalTrainingOrder> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PersonalTrainingOrderEntity): Promise<PersonalTrainingOrder> {
      const entityData = item.toObject();
      return this.prisma.personalTrainingOrder.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.personalTrainingOrder.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<PersonalTrainingOrder | null> {
    return this.prisma.personalTrainingOrder.findFirst({
      where: {
        id
      },
    });
  }




  public find(query: PersonalTrainingOrderQuery): Promise<PersonalTrainingOrder[]> {
    const {
      limit,
      page,
      sortDirection,
    } = query;

    return this.prisma.personalTrainingOrder.findMany({
      orderBy: {
        createdAt: sortDirection,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<PersonalTrainingOrderEntity>): Promise<PersonalTrainingOrder> {
    return this.prisma.personalTrainingOrder.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }



  public updateStatus(id: number, status: string): Promise<PersonalTrainingOrder> {
    return this.prisma.personalTrainingOrder.update({
      where: { id },
      data: {
        status
      },
    })
  }
}
