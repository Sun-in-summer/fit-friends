import { Gender, Place, TrainingType, UserRole,  } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {Expose, Transform, Type} from 'class-transformer';
import { TrainingLevel } from 'libs/shared-types/src/lib/training.types/training-level.enum';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { CoachDto } from '../dto/user-type.dto.ts/coach.dto';
import { TraineeDto } from '../dto/user-type.dto.ts/trainee.dto';


export class UserRdo {
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  public dateBirth: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  public firstname: string;

  @Expose()
  @ApiProperty({
    description: 'User gender',
    example: 'Male'
  })
  gender: Gender;

  @Expose()
  @Type()
  @ApiProperty({
    description: 'User role',
    example: 'Trainee'
  })
  role: UserRole;

  @Expose()
  @Type()
  @ApiProperty({
    description: 'User preffered  gym place',
    example: 'Udelnaya'
  })
  place: Place;

  @Expose()
  @ApiProperty({
    description: 'Detailed info about trainings',
    required: true
  })
  public traineeOrCoach: TraineeDto | CoachDto


  @Expose()
  public isReadyToTrainPersonally: boolean;

  @Expose()
  public caloriesToSpendPerDay: number;

  @Expose()
  public isReadyForTraining: boolean;

 @Expose()
  trainingLevel?:TrainingLevel;

  @Expose()
  trainingType?: TrainingType[];

  @Expose()
  certificate?: string;

  @Expose()
  credits?: string;

  @Expose()
  trainingTime?: TrainingTime;

  @Expose()
  caloriesToDrop?: number;

}



