import { CoachUser, ExtendedUser, Gender, Place, TraineeUser, TrainingType, UserRole} from '@fitfriends/shared-types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './fit-user.constant';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';


export class FitUserEntity implements ExtendedUser {
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
  public trainingLevel: TrainingLevel;
  public trainingType: TrainingType[];
  public trainingTime?: TrainingTime;
  public caloriesToDrop?: number;
  public caloriesToSpendPerDay?: number;
  public isReadyForTraining?: boolean;
  public isReadyToTrainPersonally?: boolean;
  public credits?: string;
  public certificate?: string;
  public myFriends?: string[];



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
    this.myFriends =[...fitUser.myFriends] ;
  }
}
