import { CoachCreditsLength, TrainingTypesQty } from '@fitfriends/shared-constants';
import { Gender, UserRole, Place, TrainingType} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, Contains, IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';



export class CreateCoachUserDto   {
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
    example: 'Coach',
    default: 'тренер'
  })
  @IsEnum(UserRole)
  public role: UserRole.Coach;

  @ApiProperty({
    description: 'Prefferred gym place',
    example: 'Udelnaya'
  })
  @IsEnum(Place)
  public place: Place;


  @ApiProperty({
    description: 'User training level',
    example: 'Beginner',
    required: true
  })
  @IsDefined()
  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  public trainingLevel: TrainingLevel;


  @ApiProperty({
    description: 'User prefferred training types ',
    example: 'Yoga, Boxing, Stretching',
    required: true
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(TrainingTypesQty.Min)
  @ArrayMaxSize(TrainingTypesQty.Max)
  @IsEnum(TrainingType, { each: true })
  public trainingType: TrainingType[];


  @ApiProperty({
    description: 'Coach certificate, 1 file, PDF',
    example: '.../images/certificate.pdf',
    required: true
  })
  @IsNotEmpty()
  @Contains('pdf')
  public certificate: string;

  @ApiProperty({
    description: 'Coach credits, text',
    example: 'The best coach ever, champion of the world'
  })
  @IsString()
  @MinLength(CoachCreditsLength.Min, {
    message: 'The lenght of description of  credits is too short',
  })
  @MaxLength(CoachCreditsLength.Max, {
    message: 'The lenght of description of  credits is too long',
  })
  public credits?: string;


  @ApiProperty({
    description: 'Coach is ready to  train  personally , not only groups',
    example: 'True'
  })
  @IsBoolean()
  public isReadyToTrainPersonally?: boolean;


}
