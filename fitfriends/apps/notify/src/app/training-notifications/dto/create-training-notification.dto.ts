import { IsNotEmpty } from 'class-validator';
import {
  COACH_ID_IS_EMPTY,
  COACH_NAME_IS_EMPTY,
  TRAINING_ID_IS_EMPTY,
  TRAINING_TITLE_IS_EMPTY,
} from '../../email-subscriber/email-subscriber.constant';

export class CreateTrainingNotificationDto {
  @IsNotEmpty({ message: TRAINING_TITLE_IS_EMPTY })
  public trainingTitle: string;

  @IsNotEmpty({ message: COACH_ID_IS_EMPTY })
  public coachId: string;

  @IsNotEmpty({ message: COACH_NAME_IS_EMPTY })
  public coachName: string;

  @IsNotEmpty({ message: TRAINING_ID_IS_EMPTY })
  public trainingId: number;

  public lastNotification: Date;

}
