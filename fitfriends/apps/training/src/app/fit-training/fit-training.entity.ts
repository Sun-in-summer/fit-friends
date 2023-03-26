import {Training} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';


export class FitTrainingEntity implements Entity<FitTrainingEntity>, Training {

  public title: string;
  public backgroundImage: string;
  public trainingLevel: string;
  public trainingType: string;
  public trainingTime: string;
  public price: number;
  public calories: number;
  public description: string;
  public trainingForGender: string;
  public video: string;
  public rating: number;
  public coachId: string;
  public isSpecialOffer: boolean;
  public createdAt: Date;

  constructor(training: Training) {
    this.fillEntity(training);
  }


  public fillEntity(entity: Training) {
    this.title = entity.title;
    this.backgroundImage= entity.backgroundImage;
    this.trainingLevel= entity.trainingLevel;
    this.trainingType= entity.trainingType;
    this.trainingTime= entity.trainingTime;
    this.price= entity.price;
    this.calories= entity.calories;
    this.description=entity.description;
    this.trainingForGender= entity.trainingForGender;
    this.video= entity.video;
    this.rating= entity.rating;
    this.coachId = entity.coachId;
    this.isSpecialOffer= entity.isSpecialOffer;
    this.createdAt= entity.createdAt;
  }

  public toObject(): FitTrainingEntity {
    return { ...this }
  }
}
