import { CRUDRepository } from '@fitfriends/core';
import { TrainingNotification } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingNotificationEntity } from './training-notification.entity';
import { TrainingNotificationModel } from './training-notification.model';


@Injectable()
export class TrainingNotificationRepository implements CRUDRepository<TrainingNotificationEntity, string, TrainingNotification> {
  constructor(
    @InjectModel(TrainingNotificationModel.name) private readonly trainingNotificationModel: Model<TrainingNotificationModel>
  ) {}

  public async create(item: TrainingNotificationEntity): Promise<TrainingNotification> {
    const newTrainingNotification = new this.trainingNotificationModel(item);
    return newTrainingNotification.save();
  }

  public async destroy(id: string): Promise<void> {
    this.trainingNotificationModel.deleteOne({ id });
  }

  public async findByTrainingId(id: number): Promise<TrainingNotification | null> {
    return this.trainingNotificationModel
        .findOne({ trainingId: id })
        .exec();
  }

  public async update(id: string, item: TrainingNotificationEntity): Promise<TrainingNotification> {
    return this.trainingNotificationModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<TrainingNotification | null> {
    return this.trainingNotificationModel
      .findOne({ email })
      .exec()
  }

   public async findById(id: string): Promise<TrainingNotification | null> {
    return this.trainingNotificationModel
        .findOne({ id })
        .exec();
  }


   public async find(): Promise<TrainingNotification[]> {
    return this.trainingNotificationModel
    .find()
    .exec();
  }

}
