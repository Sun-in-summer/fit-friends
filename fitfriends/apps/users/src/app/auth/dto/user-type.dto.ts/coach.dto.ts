import { UserRole } from '@fitfriends/shared-types';
import { ArrayMaxSize, ArrayMinSize, Contains, IsArray, IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/trainging-type.enum';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import {CoachCreditsLength, TrainingTypesQty} from '@fitfriends/shared-constants'
import { ApiProperty } from '@nestjs/swagger';
import { UserDetailsBaseDto } from './user-details.dto';



export class CoachDto extends UserDetailsBaseDto {

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

  constructor() {
    super()
    this.role = UserRole.Coach
  }

}

