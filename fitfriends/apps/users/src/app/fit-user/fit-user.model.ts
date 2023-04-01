import { Document } from 'mongoose';
import { BasicUser,  Gender, Place, TrainingType,  UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';



@Schema({
  collection: 'users',
  timestamps: true,
  discriminatorKey: 'role'
})
export class FitUserModel extends Document implements BasicUser{
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
  myFriends?: string[];

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


}


export const FitUserSchema = SchemaFactory.createForClass(FitUserModel);


