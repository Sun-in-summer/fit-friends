import { CaloriesToDrop, CaloriesToSpendADay, TrainingTypesQty, UserNameLength } from '@fitfriends/shared-constants';
import { Gender, UserRole, Place, TrainingType} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsISO8601, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';



export class CreateTraineeUserDto  {
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
    example: 'Coach',
    default: 'пользователь'
  })
  @IsEnum(UserRole)
  public role: UserRole.Trainee;

  @ApiProperty({
    description: 'Prefferred gym place',
    example: 'Udelnaya'
  })
  @IsEnum(Place)
  public place: Place;



  @ApiProperty({
    description: 'User training level',
    example: 'Beginner'
  })
  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  public trainingLevel: TrainingLevel;



  @ApiProperty({
    description: 'User prefferred training types ',
    example: 'Yoga, Boxing, Stretching'
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(TrainingTypesQty.Min)
  @ArrayMaxSize(TrainingTypesQty.Max)
  @IsEnum(TrainingType, { each: true })
  public trainingType: TrainingType[];


  @ApiProperty({
    description: 'User prefferred training duration ',
    example: '10-30 min'
  })
  @IsNotEmpty()
  @IsEnum(TrainingTime)
  public trainingTime: TrainingTime;


  @ApiProperty({
    description: 'Qty of calories  user needs to drop ',
    example: '1050'
  })
  @IsInt()
  @IsNotEmpty()
  @Min(CaloriesToDrop.Min)
  @Max(CaloriesToDrop.Max)
  public caloriesToDrop: number;


  @ApiProperty({
    description: 'Qty of calories  user needs to spend a day ',
    example: '3050'
  })
  @IsInt()
  @IsNotEmpty()
  @Min(CaloriesToSpendADay.Min)
  @Max(CaloriesToSpendADay.Max)
  public caloriesToSpendPerDay: number;


  @ApiProperty({
    description: 'User is ready to accept invitations for training  ',
    example: 'True'
  })
  @IsBoolean()
  @IsNotEmpty()
  public isReadyForTraining: boolean;
}
