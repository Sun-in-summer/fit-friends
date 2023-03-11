import {UserRole} from './user-role.enum';
import {Gender} from './gender.enum';
import { Trainee } from './user-role.types/trainee.type';
import { Coach } from './user-role.types/coach.type';

export interface BasicUser {
  _id?: string;
  firstname: string;
  email: string;
  avatar: string;
  passwordHash: string;
  gender: Gender;
  dateBirth?: Date;
  role: UserRole;
  location: Location;
  createdAt: Date;
}


export interface User extends BasicUser {
  trainee?: Trainee
  coach?: Coach
}
