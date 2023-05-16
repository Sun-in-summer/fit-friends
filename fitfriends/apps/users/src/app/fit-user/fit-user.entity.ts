import { CoachUser, ExtendedUser, TraineeUser} from '@fitfriends/shared-types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './fit-user.constant';



export class FitUserEntity implements ExtendedUser {
  public _id: string;
  public firstname: string;
  public email: string;
  public avatar:  string;
  public dateBirth: Date;
  public gender: string;
  public passwordHash: string;
  public role: string;
  public place: string;
  public createdAt: Date;
  public trainingLevel: string;
  public trainingType: string[];
  public trainingTime?: string;
  public caloriesToDrop?: number;
  public caloriesToSpendPerDay?: number;
  public isReadyForTraining?: boolean;
  public isReadyToTrainPersonally?: boolean;
  public credits?: string;
  public certificate?: string;
  public myFriends?: string[];
  public favoriteGyms: number[];
  public isEmailVerified?: boolean;
  public isReadyToGetNotifications?: boolean;
  public favoriteCoaches?: string[];
  public sentRequestForFriends: string[];
  public gotRequestForFriends: string[];




  constructor(fitUser: TraineeUser | CoachUser) {
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


  public fillEntity(fitUser: ExtendedUser) {
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
    this.trainingLevel = fitUser.trainingLevel;
    this.trainingTime= fitUser.trainingTime;
    this.trainingType = fitUser.trainingType;
    this.caloriesToDrop = fitUser.caloriesToDrop;
    this.caloriesToSpendPerDay = fitUser.caloriesToSpendPerDay;
    this.isReadyForTraining = fitUser.isReadyForTraining;
    this.isReadyToTrainPersonally = fitUser.isReadyToTrainPersonally;
    this.certificate = fitUser.certificate;
    this.credits = fitUser.credits;
    this.myFriends =fitUser.myFriends ;
    this.favoriteGyms = fitUser.favoriteGyms;
    this.isEmailVerified = fitUser.isEmailVerified
    this.isReadyToGetNotifications= fitUser.isReadyToGetNotifications
    this.favoriteCoaches= fitUser.favoriteCoaches;
    this.sentRequestForFriends= fitUser.sentRequestForFriends;
    this.gotRequestForFriends= fitUser.gotRequestForFriends;

  }
}
