import {UserRole} from './user-role.enum';
import {Gender} from './gender.enum';
import { Place } from './place.enum';
import { Trainee } from './user-role.types/trainee.type';
import { Coach } from './user-role.types/coach.type';
import { TrainingTime } from './training.types/training-time.enum';
import { TrainingLevel } from './training.types/training-level.enum';
import { TrainingType } from './training.types/training-type.enum';

export interface BasicUser {
  _id?: string ;
  firstname: string;
  email: string;
  avatar: string;
  passwordHash: string;
  gender: Gender;
  dateBirth?: Date;
  role: UserRole;
  place: Place;
  createdAt?: Date;
  myFriends?: string[];
  trainingLevel:TrainingLevel;
  trainingType: TrainingType[];
  favoriteGyms: number[];
  balanceId: number;
}


export interface User extends BasicUser {
  traineeOrCoach: Trainee | Coach
}


export interface TraineeUser extends BasicUser {
  trainingTime?: TrainingTime;
  caloriesToDrop?: number;
  caloriesToSpendPerDay?: number;
  isReadyForTraining?: boolean;
}

export interface CoachUser extends BasicUser {
  certificate?: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
}

export interface ExtendedUser extends BasicUser {
  certificate?: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
  trainingTime?: TrainingTime;
  caloriesToDrop?: number;
  caloriesToSpendPerDay?: number;
  isReadyForTraining?: boolean;
}
