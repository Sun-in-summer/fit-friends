import { Document } from 'mongoose';
import {  TraineeUser, TrainingTime } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';




@Schema({
  collection: 'users',
  timestamps: true
})
export class FitUserTraineeModel extends Document implements TraineeUser{

  public avatar: string ;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public passwordHash: string;
  public gender: string;
  public place: string;
  public createdAt: Date;
  public role: string;
  public trainingLevel: string;
  public trainingType: string[];
  public myFriends?: string[];
  public favoriteGyms?: number[];
  public sentRequestForFriends: string[];
  public gotRequestForFriends: string[];


  @Prop({
    type: String,
    enum: TrainingTime,
  })
  public trainingTime?: string;

  @Prop({
    type: Number,
     min: 1000,
    max: 5000,
  })
  public caloriesToDrop?: number;

  @Prop({
    min: 1000,
    max: 5000,
    type: Number,
  })
  public caloriesToSpendPerDay?: number;

  @Prop({
    type: Boolean,
  })
  public isReadyForTraining?: boolean;


}


export const FitUserTraineeSchema = SchemaFactory.createForClass(FitUserTraineeModel);


