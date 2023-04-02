import { Order, Review, Training, TrainingType } from '@fitfriends/shared-types';
import {CaloriesToDrop, TrainingDescriptionLength, TrainingPrice, TrainingTitleLength, VIDEO_URL_REG_EXP, DEFAULT_RATING} from '@fitfriends/shared-constants';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { TrainingForGender } from 'libs/shared-types/src/lib/training.types/traning-for-gender';
import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDataURI, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength} from 'class-validator';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';

import { Expose } from 'class-transformer';



export class CreatedFitTrainingRdo  implements Training {
  @ApiProperty({
    description: 'Id of  this training',
    example: true
  })
  @IsOptional()
  @Expose()
  id?: number;



  @Expose()
  @ApiProperty({
    description: 'Training\'s  title',
    example: 'Best training for women',
    required: true
  })
  @IsDefined()
  @IsString()
  @MinLength(TrainingTitleLength.Min)
  @MaxLength(TrainingTitleLength.Max)
  title: string;

  @Expose()
  @ApiProperty({
    description: 'Background image for training',
    example: '1.png',
    required: true
  })
  @IsDefined()
  @IsDataURI()
  // eslint-disable-next-line no-useless-escape
  @Matches('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|png))(?:\?([^#]*))?(?:#(.*))?')
  @IsString()
  backgroundImage: string;

  @Expose()
  @ApiProperty({
    description: 'Training level of this training',
    example: 'Beginner',
    required: true
  })
  @IsEnum(TrainingLevel)
  @IsDefined()
  trainingLevel: TrainingLevel

  @Expose()
  @ApiProperty({
    description: 'Training type of  the training ',
    example: 'Yoga, Boxing, Stretching',
    required: true,
  })
  @IsEnum(TrainingType)
  @IsDefined()
  trainingType: TrainingType;

  @Expose()
  @ApiProperty({
    description: 'Training duration ',
    example: '10-30 min',
    required: true
  })
  @IsDefined()
  @IsEnum(TrainingTime)
  trainingTime: TrainingTime;

  @Expose()
  @ApiProperty({
    description: 'Training\'s price ',
    example: '5 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  @Min(TrainingPrice.Min)
  price: number;

  @Expose()
  @ApiProperty({
    description: 'Qty of calories  user can drop on this training ',
    example: '1050',
    required: true
  })
  @IsDefined()
  @IsInt()
  @Min(CaloriesToDrop.Min)
  @Max(CaloriesToDrop.Max)
  calories: number;

  @Expose()
  @ApiProperty({
    description: 'Description of  this training ',
    example: 'This training helps to  looase weight',
    required: true
  })
  @IsNotEmpty()
  @Min(TrainingDescriptionLength.Min)
  @Max(TrainingDescriptionLength.Max)
  description: string;

  @Expose()
 @ApiProperty({
    description: 'Gender of users for whom this training',
    example: 'Male/Female/NoInfo',
    required: true
  })
  @IsEnum(TrainingForGender)
  trainingForGender: string;

  @Expose()
  @ApiProperty({
    description: 'Video of this training',
    example: '1.mov',
    required: true
  })
  @IsDefined()
  @IsDataURI()
  @Matches(VIDEO_URL_REG_EXP)
  @IsString()
  video: string;

  @Expose()
  @ApiProperty({
    description: 'Training raiting',
    example: 5
  })
  @IsOptional()
  @IsNumber()
  @Min(DEFAULT_RATING)
  rating: number;

  @Expose()
  @ApiProperty({
    description: 'Id of the coach',
    example: true
  })
  coachId?: string;

  @Expose()
  @ApiProperty({
    description: 'Is the training  special offer',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isSpecialOffer: boolean;

  @Expose()
  @ApiProperty({
    description: 'Reviews for this training',
    example: true
  })
  @IsOptional()
  reviews: Review[];

  @Expose()
  @ApiProperty({
    description: 'Orders for this training',
    example: true
  })
  @IsOptional()
  orders: Order[];

  @Expose()
  createdAt: Date;
}
