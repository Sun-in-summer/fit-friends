import { Notification } from '@fitfriends/shared-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TEXT_IS_EMPTY, USER_ID_IS_EMPTY } from '../notification.constant';


export class CreateNotificationDto implements Notification{
  @IsOptional()
  id?: string;

  @IsOptional()
  createdAt: Date;

  @IsNotEmpty({ message: TEXT_IS_EMPTY})
  text: string;

  @IsOptional()
  notifyAt?: Date;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
