import { CRUDRepository } from '@fitfriends/core';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GymEntity } from './gym.entity';
import { Gym } from '@fitfriends/shared-types';

@Injectable()
export class GymRepository implements CRUDRepository<GymEntity, number, Gym> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: GymEntity): Promise<Gym> {
    return this.prisma.gym.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.gym.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Gym | null> {
    return this.prisma.gym.findFirst({
      where: {
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<Gym[]> {
    return this.prisma.gym.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: GymEntity): Promise<Gym> {
    return this.prisma.gym.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
