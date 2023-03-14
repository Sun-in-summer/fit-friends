import { CaloriesToDrop, TrainingTypesQty, CaloriesToSpendADay } from '@fitfriends/shared-constants';
import { UserRole } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { TrainingType } from 'libs/shared-types/src/lib/training.types/training-type.enum';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { UserDetailsBaseDto } from './user-details.dto';

export class TraineeDto extends UserDetailsBaseDto {

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

  constructor() {
    super()
    this.role = UserRole.Trainee
  }
}
