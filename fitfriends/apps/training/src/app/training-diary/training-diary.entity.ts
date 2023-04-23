import {TrainingDiary} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';


export class TrainingDiaryEntity implements Entity<TrainingDiaryEntity>, TrainingDiary {


  public spentCalories: number;
  public spentTime: string;
  public updatedAt?: Date;
  public userId: string;
  public date: Date;
  public trainingId: number;

  constructor(trainingDiary: TrainingDiary) {
    this.fillEntity(trainingDiary);
  }


  public fillEntity(entity: TrainingDiary) {

    this.spentCalories  = entity.spentCalories;
    this.spentTime = entity.spentTime;
    this.updatedAt = entity.updatedAt;
    this.userId = entity.userId;
    this.date = entity.date;
    this.trainingId = entity.trainingId;
  }

  public toObject(): TrainingDiaryEntity {
    return { ...this }
  }
}
