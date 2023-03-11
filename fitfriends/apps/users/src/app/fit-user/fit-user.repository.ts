import {CRUDRepository} from '@fitfriends/core';
import {FitUserEntity} from './fit-user.entity';
import {User} from '@fitfriends/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {FitUserModel} from './fit-user.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';

@Injectable()
export class FitUserRepository implements CRUDRepository<FitUserEntity, string, User> {
  constructor(
    @InjectModel(FitUserModel.name) private readonly fitUserModel: Model<FitUserModel>) {
  }

  public async create(item: FitUserEntity): Promise<User> {
    const newFitUser = new this.fitUserModel(item);
    return newFitUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.fitUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.fitUserModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.fitUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: FitUserEntity): Promise<User> {
    return this.fitUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
