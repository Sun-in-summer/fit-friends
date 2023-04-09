import { Entity } from '@fitfriends/core';
import { Subscriber } from '@fitfriends/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public userId: string;
  public isEmailVerified: boolean;
  public isReadyToGetNotifications: boolean;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }


  public fillEntity(entity) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.firstname = entity.firstname;
    this.isEmailVerified = entity.isEmailVerified;
    this.isReadyToGetNotifications = entity.isReadyToGetNotifications;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
