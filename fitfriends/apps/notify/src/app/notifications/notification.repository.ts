import { CRUDRepository } from '@fitfriends/core';
import { Notification } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationEntity } from './notification.entity';
import { NotificationModel } from './notification.model';


@Injectable()
export class NotificationRepository implements CRUDRepository<NotificationEntity, string, Notification> {
  constructor(
    @InjectModel(NotificationModel.name) private readonly notificationModel: Model<NotificationModel>
  ) {}

  public async create(item: NotificationEntity): Promise<Notification> {
    const newNotification = new this.notificationModel(item);
    return newNotification.save();
  }

  public async destroy(id: string): Promise<void> {
    this.notificationModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<Notification | null> {
    return this.notificationModel
        .findOne({ id })
        .exec();
  }

  public async update(id: string, item: NotificationEntity): Promise<Notification> {
    return this.notificationModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByUserId(userId: string): Promise<Notification[] | null> {
    return this.notificationModel
      .find({ userId })
      .exec()
  }


}
