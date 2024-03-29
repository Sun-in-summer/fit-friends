import { CreateTraining, TrainingType } from '@fitfriends/shared-types';
import {CaloriesToDrop, TrainingDescriptionLength, TrainingPrice, TrainingTitleLength, VIDEO_URL_REG_EXP, IMAGE_URL_REG_EXP ,DEFAULT_RATING, MAX_RATING} from '@fitfriends/shared-constants';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { TrainingForGender } from 'libs/shared-types/src/lib/training.types/traning-for-gender';
import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, MaxLength, Min, MinLength} from 'class-validator';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';



export class CreateFitTrainingDto implements CreateTraining {

  @ApiProperty({
    description: 'Training\'s  title',
    example: 'Best training for women',
    required: true
  })
  @IsDefined()
  @IsString()
  @MinLength(TrainingTitleLength.Min)
  @MaxLength(TrainingTitleLength.Max)
  public title: string;


  @ApiProperty({
    description: 'Background image for training',
    example: '1.png',
    required: true
  })
  @IsDefined()
  @Matches(IMAGE_URL_REG_EXP)
  @IsString()
  public backgroundImage: string;

 @ApiProperty({
    description: 'Training level of this training',
    example: 'Beginner',
    required: true
  })
  @IsEnum(TrainingLevel)
  @IsDefined()
  public trainingLevel: string;

  @ApiProperty({
    description: 'Training type of  the training ',
    example: 'Yoga, Boxing, Stretching',
    required: true,
  })
  @IsEnum(TrainingType)
  @IsDefined()
  public trainingType: string;

  @ApiProperty({
    description: 'Training duration ',
    example: '10-30 мин',
    required: true
  })
  @IsDefined()
  @IsEnum(TrainingTime)
  public trainingTime: string;


  @ApiProperty({
    description: 'Training\'s price ',
    example: '5 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  @Min(TrainingPrice.Min)
  public price: number;

  @ApiProperty({
    description: 'Qty of calories  user can drop on this training ',
    example: '1050',
    required: true
  })
  @IsDefined()
  @IsInt()
  @Min(CaloriesToDrop.Min)
  @Max(CaloriesToDrop.Max)
  public calories: number;


  @ApiProperty({
    description: 'Description of  this training ',
    example: 'This training helps to  looase weight',
    required: true
  })
  @IsNotEmpty()
  @Length(TrainingDescriptionLength.Min, TrainingDescriptionLength.Max )
  public description: string;

 @ApiProperty({
    description: 'Gender of users for whom this training',
    example: 'Male/Female/NoInfo',
    required: true
  })
  @IsNotEmpty()
  @IsEnum(TrainingForGender)
  public trainingForGender: string;

  @ApiProperty({
    description: 'Video of this training',
    example: '1.mov',
    required: true
  })
  @IsDefined()
  @Matches(VIDEO_URL_REG_EXP)
  @IsString()
  public video: string;

  @ApiProperty({
    description: 'Training raiting',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(DEFAULT_RATING)
  @Max(MAX_RATING)
  public rating: number;

  @ApiProperty({
    description: 'Id of the coach',
    example: true
  })
  public oachId?: string;

  @ApiProperty({
    description: 'Is the training  special offer',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  public isSpecialOffer: boolean;


  @ApiProperty({
    description: 'The date of creation of this training',
    example: true
  })
  @IsOptional()
  public createdAt: Date;

}
