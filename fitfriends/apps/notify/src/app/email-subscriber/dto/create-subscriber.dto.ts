import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  USER_ID_IS_EMPTY,
} from '../email-subscriber.constant';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  firstname: string;

  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;

}
