import { Notification } from '@fitfriends/shared-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TEXT_IS_EMPTY, USER_ID_IS_EMPTY } from '../notification.constant';
import { Expose } from 'class-transformer';


export class CreatedNotificationRdo implements Notification{
  @Expose()
  @IsOptional()
  id?: string;

  @Expose()
  @IsOptional()
  createdAt: Date;

  @Expose()
  @IsNotEmpty({ message: TEXT_IS_EMPTY})
  text: string;

  @Expose()
  @IsOptional()
  notifyAt?: Date;

  @Expose()
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
