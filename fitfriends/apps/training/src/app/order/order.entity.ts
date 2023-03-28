import {Order} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';



export class OrderEntity implements Entity<OrderEntity>, Order {

  public id : number;
  public userId: string;
  public orderType: string;
  public trainingId?: number;
  public gymId?: number;
  public price: number;
  public quantity: number;
  public amount: number;
  public paymentWay: string;
  public createdAt: Date;

  constructor(order: Order) {
    this.fillEntity(order);
  }


  public fillEntity(entity: Order) {
    this.id = entity.id;
    this.userId= entity.userId;
    this.orderType= entity.orderType;
    this.trainingId = entity.trainingId;
    this.gymId = entity.gymId;
    this.price= entity.price;
    this.quantity= entity.quantity;
    this.amount= entity.amount;
    this.paymentWay= entity.paymentWay;
    this.createdAt= entity.createdAt;
  }

  public toObject(): OrderEntity {
    return { ...this }
  }

  private getTotalCost() {
    return this.price * this.amount;
  }
}
