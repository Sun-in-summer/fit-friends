import { TrainingDiary } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsDefined, IsEnum, IsInt, IsMongoId, IsOptional, IsString} from 'class-validator';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';


export class CreateTrainingDiaryDto implements TrainingDiary {

  @ApiProperty({
    description: 'Id of training',
    example: '1',
    required: true
  })
  @IsDefined()
  @IsInt()
  trainingId: number;

  @ApiProperty({
    description: 'userId',
    example: '1',
  })
  @IsMongoId()
  userId?: string;

  @ApiProperty({
    description: 'id of training diary',
    example: '1',
  })
  id?: number;

  @ApiProperty({
    description: 'Training time based on info in training',
    example: '10-30 мин',
    required: true
  })
  @IsDefined()
  @IsString()
  @IsEnum(TrainingTime)
  spentTime: string;


  @ApiProperty({
    description: 'Calories quantity spent during training ',
    example: '100 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  spentCalories: number;


  @ApiProperty({
    description: 'The date of updating of this training diary',
    example: true
  })
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'The date of the training',
    example: true
  })
  @IsDateString()
  date: Date;
}
