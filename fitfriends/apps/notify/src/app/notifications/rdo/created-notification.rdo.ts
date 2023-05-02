import { Notification } from '@fitfriends/shared-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TEXT_IS_EMPTY, USER_ID_IS_EMPTY } from '../notification.constant';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';


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
  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
