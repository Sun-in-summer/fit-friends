import { CRUDRepository } from '@fitfriends/core';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { Review } from '@fitfriends/shared-types';


@Injectable()
export class ReviewRepository implements CRUDRepository<ReviewEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewEntity): Promise<Review> {
    return this.prisma.review.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public findByUserId(id: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        userId: id,
      }
    });
  }

  public findByTrainingId(id: number): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        trainingId: id,
      }
    });
  }

  public update(id: number, item: ReviewEntity): Promise<Review> {
    return this.prisma.review.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
