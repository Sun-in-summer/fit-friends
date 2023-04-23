import { UserBalance} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';


export class UserBalanceEntity implements Entity<UserBalanceEntity>, UserBalance {



  public userId: string;
  public updatedAt?: Date;
  public id?: number;
  public subscriptionId: number;
  public subscriptionAvaliable: number;
  public subscriptionSpent: number;
  public trainingId: number;
  public trainingAvaliable: number;
  public trainingSpent: number;

  constructor(userBalance: UserBalance) {
    this.fillEntity(userBalance);
  }




  public fillEntity(entity: UserBalance) {

    this.userId = entity.userId;
    this.updatedAt  = entity.updatedAt;
    this.id = entity.id;
    this.userId = entity.userId;
    this.updatedAt = entity.updatedAt;
    this.subscriptionId = entity. subscriptionId
    this.subscriptionAvaliable = entity.subscriptionAvaliable;
    this.subscriptionSpent= entity.subscriptionSpent;
    this.trainingId= entity.trainingId;
    this.trainingAvaliable= entity.trainingAvaliable;
    this.trainingSpent = entity.trainingSpent;
  }

  public toObject(): UserBalanceEntity {
    return { ...this }
  }
}
