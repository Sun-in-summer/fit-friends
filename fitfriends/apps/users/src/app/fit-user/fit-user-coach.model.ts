import { Document } from 'mongoose';
import { CoachUser, Gender,  UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



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
  public role: string;
  public gender: string;
  public place: string;
  public createdAt: Date;
  public trainingLevel: string;
  public trainingType: string[];
  public myFriends?: string[];
  public favoriteGyms?: number[];
  public sentRequestForFriends: string[];
  public gotRequestForFriends: string[];


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


