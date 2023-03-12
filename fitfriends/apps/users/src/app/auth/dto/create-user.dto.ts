import { Gender, UserRole, Place} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsISO8601, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User firstname',
    example: 'Ivan'
  })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
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
  @IsString()
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
  public gender: Gender;

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
  public role: UserRole;

  @ApiProperty({
    description: 'Prefferred gym place',
    example: 'Udelnaya'
  })
  @IsEnum(Place)
  public place: Place;

 @ApiProperty({
    description: 'Detailed info about trainings',
  })
  @ValidateNested()
  public traineeOrCoach: Trainee | Coach;
}
