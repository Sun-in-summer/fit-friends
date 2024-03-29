import { PasswordLength } from '@fitfriends/shared-constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;
}
