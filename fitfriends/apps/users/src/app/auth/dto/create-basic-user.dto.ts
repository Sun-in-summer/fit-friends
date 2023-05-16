import {  UserNameLength } from '@fitfriends/shared-constants';
import { Gender, UserRole, Place} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsEnum, IsISO8601,  IsString,  MaxLength,  MinLength} from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';


export class CreateBasicUserDto  {
  @ApiProperty({
    description: 'User firstname',
    example: 'Ivan'
  })
  @IsString()
  @MinLength(UserNameLength.Min)
  @MaxLength(UserNameLength.Max)
  public firstname: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty({
    description: 'User avatar',
    example: '1.img'
  })
  public avatar: string;

  @ApiProperty({
    description: 'User dateBirth',
    example: '1981-03-12',
  })
  @IsISO8601({},
    {message: AUTH_USER_DATE_BIRTH_NOT_VALID,
  })
  public dateBirth: Date;

   @ApiProperty({
    description: 'User gender',
    example: 'Male/Female/NoInfo'
  })
  @IsEnum(Gender)
  public gender: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;

  @ApiProperty({
    description: 'User role: coach or trainee',
    example: 'Coach'
  })
  @IsEnum(UserRole)
  public role: string;

  @ApiProperty({
    description: 'Prefferred gym place',
    example: 'Udelnaya'
  })
  @IsEnum(Place)
  public place: string;


}
