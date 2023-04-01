import { Document } from 'mongoose';
import {  Gender, Place,  TraineeUser,   UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/training-type.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';




@Schema({
  collection: 'users',
  timestamps: true
})
export class FitUserTraineeModel extends Document implements TraineeUser{

  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public passwordHash: string;
  public gender: Gender;
  public place: Place;
  public createdAt: Date;
  public role: UserRole;
  public trainingLevel: TrainingLevel;
  public trainingType: TrainingType[];
  public myFriends?: string[];


  @Prop({
    type: String,
    enum: TrainingTime,
  })
  public trainingTime?: TrainingTime;

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


