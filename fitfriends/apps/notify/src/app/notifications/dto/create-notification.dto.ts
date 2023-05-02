import { Notification } from '@fitfriends/shared-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TEXT_IS_EMPTY, USER_ID_IS_EMPTY } from '../notification.constant';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';


export class CreateNotificationDto implements Notification{
  @IsOptional()
  id?: string;

  @IsOptional()
  createdAt: Date;

  @IsNotEmpty({ message: TEXT_IS_EMPTY})
  text: string;

  @IsOptional()
  notifyAt?: Date;


  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
