import { Gender, UserRole, Place} from '@fitfriends/shared-types';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';

export class CreateUserDto {
  public firstname: string;
  public email: string;
  public avatar: string;
  public dateBirth: Date;
  public gender: Gender;
  public password: string;
  public role: UserRole;
  public place: Place;
  public traineeOrCoach: Trainee | Coach;
}
