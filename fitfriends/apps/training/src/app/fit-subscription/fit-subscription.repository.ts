import { CRUDRepository } from '@fitfriends/core';
import { FitSubscriptionEntity } from './fit-subscription.entity'
import { Subscription } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SubscriptionQuery } from './query/subscription.query';



@Injectable()
export class FitSubscriptionRepository implements CRUDRepository<FitSubscriptionEntity, number, Subscription> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FitSubscriptionEntity): Promise<Subscription> {
      const entityData = item.toObject();
      return this.prisma.subscription.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.subscription.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({
      where: {
        id
      }
    });
  }




  public find(query: SubscriptionQuery): Promise<Subscription[]> {
    const {
      limit,
      page,
    } = query;

    return this.prisma.subscription.findMany({
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<FitSubscriptionEntity>): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
