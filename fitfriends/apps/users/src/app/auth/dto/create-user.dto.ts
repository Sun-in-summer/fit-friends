import { UserNameLength } from '@fitfriends/shared-constants';
import { Gender, UserRole, Place} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsISO8601, IsNotEmptyObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';
import { CoachDto } from './user-type.dto.ts/coach.dto';
import { TraineeDto } from './user-type.dto.ts/trainee.dto';
import { UserDetailsBaseDto } from './user-type.dto.ts/user-details.dto';


export class CreateUserDto  {
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
    example: '1.jpg'
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
    required: true
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() =>UserDetailsBaseDto,  {
    discriminator: {
      property: 'role',
      subTypes: [
        { value: CoachDto , name: UserRole.Coach },
        { value: TraineeDto, name: UserRole.Trainee },
      ],
    },
  })
  public traineeOrCoach: TraineeDto | CoachDto
}
