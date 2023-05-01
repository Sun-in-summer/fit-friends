import { Entity } from '@fitfriends/core';
import { Notification } from '@fitfriends/shared-types';

export class NotificationEntity implements Entity<NotificationEntity>, Notification {
  public id?: string;
  public createdAt: Date;
  public userId: string;
  public text: string;
  public notifyAt?: Date;

  constructor(notification: Notification) {
    this.fillEntity(notification);
  }



  public fillEntity(entity) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.notifyAt = entity.notifyAt;
    this.text = entity.text;

  }

  public toObject(): NotificationEntity {
    return { ...this };
  }
}
