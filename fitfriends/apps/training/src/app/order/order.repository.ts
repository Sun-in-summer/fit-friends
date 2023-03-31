import { CRUDRepository } from '@fitfriends/core';
import { Order, Training, User } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';



@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderEntity): Promise<Order> {
      const entityData = item.toObject();
      return this.prisma.order.create({
        data: {
          ...entityData,
          amount: entityData.price * entityData.quantity
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: {
        id
      },
      include: {
        gym: true,
        training: true

      }
    });
  }




  public find(query: OrderQuery, userId : string): Promise<Order[]> {
    const {
      limit,
      page,
      sortDirection,
      sortBy,
    } = query;

    return this.prisma.order.findMany({
      where: {
        userId: userId,
             },
       include: {
        gym: true,
        training: true
      },
      orderBy: {
        [sortBy]: sortDirection,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<OrderEntity>): Promise<Order> {

    return this.prisma.order.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
