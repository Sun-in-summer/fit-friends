import {Gender, Location, User, UserRole} from '@fitfriends/shared-types';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';

export class FitUserEntity implements User {
  public _id: string;
  public firstname: string;
  public email: string;
  public avatar: string;
  public dateBirth: Date;
  public gender: Gender;
  public passwordHash: string;
  public role: UserRole;
  public location: Location;
  public createdAt: Date;
  public trainee?: Trainee;
  public coach?: Coach;


  constructor(fitUser: User) {
     this.fillEntity(fitUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(fitUser: User) {
    this._id = fitUser._id;
    this.firstname = fitUser.firstname;
    this.email = fitUser.email;
    this.avatar = fitUser.avatar;
    this.dateBirth = fitUser.dateBirth;
    this.gender = fitUser.gender;
    this.passwordHash = fitUser.passwordHash;
    this.role = fitUser.role;
    this.location = fitUser.location;
    this.createdAt = fitUser.createdAt;
    this.trainee = fitUser.trainee;
    this.coach = fitUser.coach;
  }
}
