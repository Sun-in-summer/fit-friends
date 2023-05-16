import { CaloriesToDrop, CaloriesToSpendADay, CoachCreditsLength, TrainingTypesQty } from '@fitfriends/shared-constants';
import { UserRole, Place, TrainingType, TrainingLevel, TrainingTime} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, Contains, IsArray, IsBoolean, IsEnum, IsInt,  IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';


export class QuestionnaireDto  {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;


  @ApiProperty({
    description: 'User role: coach or trainee',
    example: 'Coach'
  })
  @IsEnum(UserRole)
  public role: string;


  @ApiProperty({
    description: 'User training level',
    example: 'Beginner'
  })
  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  public trainingLevel: string;



  @ApiProperty({
    description: 'User prefferred training types ',
    example: 'Yoga, Boxing, Stretching'
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(TrainingTypesQty.Min)
  @ArrayMaxSize(TrainingTypesQty.Max)
  @IsEnum(TrainingType, { each: true })
  public trainingType: string[];


  @ApiProperty({
    description: 'User prefferred training duration ',
    example: '10-30 min'
  })
  @ValidateIf(o => o.role === UserRole.Trainee)
  @IsNotEmpty()
  @IsEnum(TrainingTime)
  public trainingTime?: string;


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


}
