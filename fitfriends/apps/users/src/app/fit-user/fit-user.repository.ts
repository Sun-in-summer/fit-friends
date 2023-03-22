import {CRUDRepository} from '@fitfriends/core';
import {FitUserEntity} from './fit-user.entity';
import {CoachUser, TraineeUser, User} from '@fitfriends/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { FitUserCoachModel } from './fit-user-coach.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { FitUserTraineeModel } from './fit-user-trainee.model';
import { FitUserNewModel } from './fit-user-new.model';
import { UserQuery } from '../auth/query/user.query';

@Injectable()
export class FitUserRepository implements CRUDRepository<FitUserEntity, string, TraineeUser |CoachUser> {
  constructor(
    @InjectModel(FitUserNewModel.name) private readonly fitUserNewModel: Model<FitUserNewModel>,
    // @InjectModel(UserRole.Coach) private readonly fitUserCoachModel: Model<FitUserCoachModel>,
    // @InjectModel(UserRole.Trainee) private readonly fitUserTraineeModel: Model<FitUserTraineeModel>,
    )
     {}

  public async create(item: FitUserEntity): Promise<FitUserNewModel> {


    // if (item.role === UserRole.Coach) {
    //   const newFitUser = new this.fitUserCoachModel(item);
    //   return newFitUser.save()
    // }
    const newFitUser = new this.fitUserNewModel(item);
    return newFitUser.save()
  }

  public async destroy(id: string): Promise<void> {
    this.fitUserNewModel.deleteOne({id});
  }

  public async findById(id: string): Promise<FitUserTraineeModel | FitUserCoachModel | null> {
    const user =  this.fitUserNewModel
      .findOne({_id: id})
      .exec();


      return user;
  }

  public async findByEmail(email: string): Promise<FitUserTraineeModel | FitUserCoachModel | null> {
    const user =  this.fitUserNewModel
      .findOne({email})
      .exec();

    return user;
  }

  public async update(id: string, item: FitUserEntity): Promise<FitUserNewModel> {

    return this.fitUserNewModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async find({limit, page, sortDirection, sortBy, role, trainingType}: UserQuery): Promise<FitUserNewModel[]> {
    const users = await this.fitUserNewModel.find({
        $or: [{
          userRole: {$eq: role }
        }, {
          trainingType: { $in: trainingType}
        }]

    }).limit(limit).sort({sortBy: 1})
      return users;
  }

}
