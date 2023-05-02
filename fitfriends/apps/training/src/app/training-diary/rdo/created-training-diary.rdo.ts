
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import { TrainingDiary } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {IsDefined, IsEnum, IsInt, IsOptional, IsString} from 'class-validator';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';


export class CreatedTrainingDiaryRdo implements TrainingDiary {

  @Expose()
  @ApiProperty({
    description: 'Id of training',
    example: '1',
    required: true
  })
  @IsDefined()
  @IsInt()
  trainingId: number;

  @Expose()
  @ApiProperty({
    description: 'Training time based on info in training',
    example: '10-30 мин',
    required: true
  })
  @IsDefined()
  @IsString()
  @IsEnum(TrainingTime)
  spentTime: string;


  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  userId: string;

  @Expose()
  @ApiProperty({
    description: 'id of training diary',
    example: '1',
  })
  id?: number;


  @Expose()
  @ApiProperty({
    description: 'Calories spent on training ',
    example: '100 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  spentCalories: number;

  @Expose()
  @ApiProperty({
    description: 'The date of updating of this training diary',
    example: true
  })
  @IsOptional()
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date of the training',
    example: true
  })
  @IsOptional()
  date: Date;
}
