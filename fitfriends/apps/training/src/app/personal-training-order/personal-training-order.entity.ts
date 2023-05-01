import {PersonalTrainingOrder} from '@fitfriends/shared-types';
import {Entity} from '@fitfriends/core';



export class PersonalTrainingOrderEntity implements Entity<PersonalTrainingOrderEntity>, PersonalTrainingOrder {


  public initiatorId: string;
  public conductorId: string;
  public status: string;


  constructor(personalTrainingOrder: PersonalTrainingOrder) {
    this.fillEntity(personalTrainingOrder);
  }



  public fillEntity(entity: PersonalTrainingOrder) {

    this.initiatorId = entity.initiatorId;
    this.conductorId = entity.conductorId;
    this.status = entity.status;

  }

  public toObject(): PersonalTrainingOrderEntity {
    return { ...this }
  }
}
