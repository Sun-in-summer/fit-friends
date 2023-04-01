import { Entity } from '@fitfriends/core';
import { Gym } from '@fitfriends/shared-types';

export class GymEntity implements Entity<GymEntity>, Gym {

  public name: string;
  public location: string;
  public isVerified?: boolean;
  public features: string[];
  public photos: string[];
  public description: string;
  public oneTrainingPrice: number;
  public createdAt: Date;

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }

  public fillEntity(entity: Gym) {

   this.name= entity.name;
   this.location = entity.location;
   this.isVerified= entity.isVerified;
   this.features= entity.features;
   this.photos= entity.photos;
   this.description = entity.description;
   this.oneTrainingPrice= entity.oneTrainingPrice;
   this.createdAt = entity.createdAt;
  }

  public toObject(): GymEntity {
    return { ...this }
  }
}
