import { Gender, Place, UserRole,  } from '@fitfriends/shared-types';
import {Expose, Type} from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public dateBirth: string;

  @Expose()
  public email: string;

  @Expose()
  public firstname: string;

  @Expose()
  gender: Gender;

  @Expose()
  @Type()
  role: UserRole;

  @Expose()
  @Type()
  place: Place;

}
