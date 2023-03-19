import { Document } from 'mongoose';
import {  ExtendedUser,  Gender, Place,    TrainingType,    User,    UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';



// class TraineeOrCoachUser   {
//   trainingLevel: TrainingLevel;
//   trainingType: TrainingType[];
//   trainingTime?: TrainingTime;
//   caloriesToDrop?: number;
//   caloriesToSpendPerDay?: number;
//   isReadyForTraining?: boolean;
//   role: UserRole;
//   certificate?: string;
//   credits?: string;
//   isReadyToTrainPersonally?: boolean;
// }


@Schema({
  collection: 'users',
  timestamps: true,
  discriminatorKey: 'role'
})
export class FitUserNewModel extends Document implements ExtendedUser{
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole;

  // @Prop({
  //   type: String,
  //   required: true,
  //   enum: [FitUserCoachModel.name, FitUserTraineeModel.name ],
  // })
  // kind: string;



  @Prop({
    required: true,
    type: String,
    enum: Gender,
  })
  public gender: Gender;

  @Prop({
    required: true,
    type: String,
    enum: Place,
  })
  public place: Place;

  @Prop({
    type: Date
  })
  public createdAt: Date;

  @Prop({
    type: Array,
  })
  myFriends?: User[];

  @Prop({
    required: true,
    type: String,
    enum: TrainingLevel
  })
  public trainingLevel: TrainingLevel;

  @Prop({
    required: true,
    type: Array,
    enum: TrainingType
  })
  public trainingType: TrainingType[];

  @Prop({
    type: String,
  })
  public certificate?: string;

  @Prop({
    type: String,
  })
  public credits?: string;

  @Prop({
    type: Boolean,
  })
  public isReadyToTrainPersonally?: boolean;

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


export const FitUserNewSchema = SchemaFactory.createForClass(FitUserNewModel);


