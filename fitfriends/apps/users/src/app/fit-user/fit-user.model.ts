import { Document } from 'mongoose';
import { Gender, Place, User, UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/training-type.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';


class TraineeOrCoachUser  {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingTime?: TrainingTime;
  caloriesToDrop?: number;
  caloriesToSpendPerDay?: number;
  isReadyForTraining?: boolean;
  role: UserRole;
  certificate?: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
}


@Schema({
  collection: 'users',
  timestamps: true
})
export class FitUserModel extends Document implements User {
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
    required: true,
    type: TraineeOrCoachUser
  })
  public traineeOrCoach: Trainee | Coach;

}

export const FitUserSchema = SchemaFactory.createForClass(FitUserModel);
