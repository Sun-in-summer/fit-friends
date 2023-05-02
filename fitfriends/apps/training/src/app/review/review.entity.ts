import { Entity } from '@fitfriends/core';
import { Review } from '@fitfriends/shared-types';



export class ReviewEntity implements Entity<ReviewEntity>, Review {

  public id?: number;
  public userId: string;
  public trainingId: number;
  public rating: number;
  public text: string;
  public createdAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }


  public fillEntity(entity: Review) {

   this.id= entity.id;
   this.userId = entity.userId;
   this.trainingId= entity.trainingId;
   this.rating= entity.rating;
   this.text= entity.text;
   this.createdAt = entity.createdAt;
  }

  public toObject(): ReviewEntity {
    return { ...this }
  }
}
