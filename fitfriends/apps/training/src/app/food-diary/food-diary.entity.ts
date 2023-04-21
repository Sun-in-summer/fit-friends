import {FoodDiary} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';


export class FoodDiaryEntity implements Entity<FoodDiaryEntity>, FoodDiary {


  public caloriesQty: number;
  public date: Date;
  public meal: string;
  public userId: string;
  public updatedAt?: Date;
  public createdAt: Date;

  constructor(foodDiary: FoodDiary) {
    this.fillEntity(foodDiary);
  }



  public fillEntity(entity: FoodDiary) {

    this.caloriesQty = entity.caloriesQty;
    this.date  = entity.date;
    this.meal = entity.meal;
    this.userId = entity.userId;
    this.updatedAt = entity.updatedAt;
    this.createdAt= entity.createdAt;
  }

  public toObject(): FoodDiaryEntity {
    return { ...this }
  }
}
