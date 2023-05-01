
import { Entity } from '@fitfriends/core';
import { TrainingNotification } from '@fitfriends/shared-types';


export class TrainingNotificationEntity implements Entity<TrainingNotificationEntity>, TrainingNotification {
  public id?: string;
  public trainingTitle: string;
  public coachId: string;
  public lastNotification: Date;
  public coachName: string;
  public trainingId: number;

  constructor(trainingNotification: TrainingNotification) {
    this.fillEntity(trainingNotification);
  }


  public fillEntity(entity) {
    this.id = entity.id;
    this.trainingTitle = entity.trainingTitle;
    this.coachId = entity.coachId;
    this.lastNotification = entity.lastNotification;
    this.coachName = entity.coachName;
    this.trainingId= entity.trainingId;

  }

  public toObject(): TrainingNotificationEntity {
    return { ...this };
  }
}
