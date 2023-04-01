import { CaloriesToDrop, CaloriesToSpendADay, CoachCreditsLength, TrainingTypesQty, UserNameLength } from '@fitfriends/shared-constants';
import { Gender, UserRole, Place, TrainingType} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, Contains, IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';


export class CreateUserNewDto  {
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
  @ValidateIf(o => o.role === UserRole.Trainee)
  @IsNotEmpty()
  @IsEnum(TrainingTime)
  public trainingTime?: TrainingTime;


  @ApiProperty({
    description: 'Qty of calories  user needs to drop ',
    example: '1050'
  })
  @ValidateIf(o => o.role === UserRole.Trainee)
  @IsInt()
  @IsNotEmpty()
  @Min(CaloriesToDrop.Min)
  @Max(CaloriesToDrop.Max)
  public caloriesToDrop?: number;


  @ApiProperty({
    description: 'Qty of calories  user needs to spend a day ',
    example: '3050'
  })
  @ValidateIf(o => o.role === UserRole.Trainee)
  @IsInt()
  @IsNotEmpty()
  @Min(CaloriesToSpendADay.Min)
  @Max(CaloriesToSpendADay.Max)
  public caloriesToSpendPerDay?: number;


  @ApiProperty({
    description: 'User is ready to accept invitations for training  ',
    example: 'True'
  })
  @ValidateIf(o => o.role === UserRole.Trainee)
  @IsBoolean()
  @IsNotEmpty()
  public isReadyForTraining?: boolean;


  @ApiProperty({
    description: 'Coach certificate, 1 file, PDF',
    example: '.../images/certificate.pdf',
    required: true
  })
  @ValidateIf(o => o.role === UserRole.Coach)
  @IsNotEmpty()
  @Contains('pdf', {message: 'must contain PDF'})
  public certificate?: string;

  @ApiProperty({
    description: 'Coach credits, text',
    example: 'The best coach ever, champion of the world'
  })
  @ValidateIf(o => o.role === UserRole.Coach)
  @IsString()
  @MinLength(CoachCreditsLength.Min, {
    message: 'The lenght of description of  credits is too short',
  })
  @MaxLength(CoachCreditsLength.Max, {
    message: 'The length of description of  credits is too long',
  })
  public credits?: string;


  @ApiProperty({
    description: 'Coach is ready to  train  personally , not only groups',
    example: 'True'
  })
  @ValidateIf(o => o.role === UserRole.Coach)
  @IsBoolean()
  public isReadyToTrainPersonally?: boolean;


  @ApiProperty({
    description: 'Friends of the user',
    example: ' ["64176d7eb195908961eedff8" ]'
  })
  @IsOptional()
  @IsMongoId({each: true})
  public myFriends?: string[];

}
