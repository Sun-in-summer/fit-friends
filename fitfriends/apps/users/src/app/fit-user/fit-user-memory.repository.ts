import {CRUDRepository} from '@fitfriends/core';
import {User} from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import {FitUserEntity} from './fit-user.entity';
import crypto from "crypto";

@Injectable()
export class FitUserMemoryRepository implements CRUDRepository<FitUserEntity, string, User> {
  private repository: {[key: string]: User} = {};

  public async create(item: FitUserEntity): Promise<User> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: FitUserEntity): Promise<User> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
