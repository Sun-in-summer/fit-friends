import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  COACH_ID_IS_EMPTY,
  COACH_NAME_IS_EMPTY,
  EMAIL_NOT_VALID,
  USER_ID_IS_EMPTY,
} from '../email-subscriber.constant';

export class CreateSubscriberOfCoachDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  userEmail: string;

  @IsNotEmpty({ message: COACH_ID_IS_EMPTY })
  coachId: string;

  @IsNotEmpty({ message: COACH_NAME_IS_EMPTY })
  coachName: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
