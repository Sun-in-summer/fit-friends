import { Document } from 'mongoose';
import { CoachUser, Gender, Place,  UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/training-type.enum';



@Schema({
  collection: 'users',
  timestamps: true,
})
export class FitUserCoachModel extends Document implements CoachUser{
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public passwordHash: string;
  public role: UserRole;
  public gender: Gender;
  public place: Place;
  public createdAt: Date;
  public trainingLevel: TrainingLevel;
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


}


export const FitUserCoachSchema = SchemaFactory.createForClass(FitUserCoachModel);


