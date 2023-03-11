import {Gender, Place, User, UserRole} from '@fitfriends/shared-types';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './fit-user.constant';

export class FitUserEntity implements User {
  public _id: string;
  public firstname: string;
  public email: string;
  public avatar: string;
  public dateBirth: Date;
  public gender: Gender;
  public passwordHash: string;
  public role: UserRole;
  public place: Place;
  public createdAt: Date;
  public traineeOrCoach: Trainee | Coach;


  constructor(fitUser: User) {
     this.fillEntity(fitUser);
  }

  public async setPassword(password: string) : Promise<FitUserEntity>{
    const salt =await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean>{
    return compare(password, this.passwordHash);
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
    this.place = fitUser.place;
    this.createdAt = fitUser.createdAt;
    this.traineeOrCoach = fitUser.traineeOrCoach;
  }


}
