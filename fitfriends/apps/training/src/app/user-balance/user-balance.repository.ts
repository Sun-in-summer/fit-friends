import { CRUDRepository } from '@fitfriends/core';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserBalance } from '@prisma/client';
import { UserBalanceEntity } from './user-balance.entity';
import { UserBalanceQuery } from './query/user-balance.query';



@Injectable()
export class UserBalanceRepository implements CRUDRepository<UserBalanceEntity, number, UserBalance> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: UserBalanceEntity): Promise<UserBalance> {
      const entityData = item.toObject();
      return this.prisma.userBalance.create({
        data: {
          ...entityData,
        }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.userBalance.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<UserBalance | null> {
    return this.prisma.userBalance.findFirst({
      where: {
        id
      },
    });
  }



  public find(userId : string, query?: UserBalanceQuery, ): Promise<UserBalance[]> {
    const {
      limit,
      page,
    } = query;

    return this.prisma.userBalance.findMany({
      where: {
        userId: userId,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  public update(id: number, item: Partial<UserBalanceEntity>): Promise<UserBalance> {
    return this.prisma.userBalance.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }
}
