import {Subscription} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';


export class FitSubscriptionEntity implements Entity<FitSubscriptionEntity>, Subscription {

  public id?: number;
  public trainingId: number;
  public trainingsQtyIncluded: number;

  constructor(subscription: Subscription) {
    this.fillEntity(subscription);
  }



  public fillEntity(entity: Subscription) {
    this.id = entity.id;
    this.trainingId = entity.trainingId;
    this.trainingsQtyIncluded = entity.trainingsQtyIncluded;

  }

  public toObject(): FitSubscriptionEntity {
    return { ...this }
  }
}
