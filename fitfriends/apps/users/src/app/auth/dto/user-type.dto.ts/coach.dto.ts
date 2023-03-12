import { UserRole } from '@fitfriends/shared-types';
import { ArrayMaxSize, ArrayMinSize, Contains, IsArray, IsBoolean, IsEnum, IsMimeType, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/trainging-type.enum';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { CreateUserDto } from '../create-user.dto';
import {CoachCreditsLength, TrainingTypesQty} from '@fitfriends/shared-constants'
import { ApiProperty } from '@nestjs/swagger';

export class CoachDto extends CreateUserDto {
  @ApiProperty({
    description: 'User training level',
    example: 'Beginner'
  })
  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  trainingLevel: TrainingLevel;

  @ApiProperty({
    description: 'User prefferred training types ',
    example: 'Yoga, Boxing, Stretching'
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(TrainingTypesQty.Min)
  @ArrayMaxSize(TrainingTypesQty.Max)
  @IsEnum(TrainingType, { each: true })
  trainingType: TrainingType[];


  @ApiProperty({
    description: 'Coach certificate, 1 file, PDF',
    example: '.../images/certificate.pdf'
  })
  @IsNotEmpty()
  @IsMimeType()
  @Contains('pdf')
  certificate: string;


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
  credits?: string;

  @ApiProperty({
    description: 'Coach is ready to  train  personally , not only groups',
    example: 'True'
  })
  @IsBoolean()
  isReadyToTrainPersonally?: boolean;


  constructor() {
    super()
    this.role = UserRole.Coach
  }
}
