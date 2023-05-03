import { Gender,   UserRole,  } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {Expose, Transform, Type} from 'class-transformer';
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
  place: string;

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
  trainingLevel?: string;

  @Expose()
  trainingType?: string[];

  @Expose()
  certificate?: string;

  @Expose()
  credits?: string;

  @Expose()
  trainingTime?: string;

  @Expose()
  caloriesToDrop?: number;

  @Expose()
  createdAt?: Date;

  @Expose()
  myFriends?: string[];

  @Expose()
  favoriteGyms?: number[];


  @Expose()
  @ApiProperty({
    description: 'Is email verified or not ',
    example: 'false',
    default: false
  })
  public isEmailVerified?: boolean;

  @Expose()
  @ApiProperty({
    description: 'Is user ready to get emails  or not ',
    example: 'true',
    default: true
  })
  public isReadyToGetNotifications?: boolean;

  @Expose()
  @ApiProperty({
    description: 'The coaches IDs whose trainings user is ready to get notifications about ',
    example: ' 64319c29f053f274593ebbd9',
  })
  public favoriteCoaches?: string[];


  @Expose()
  @ApiProperty({
    description: 'The Ids of  users to whom the request to be friends was sent',
    example: ' 64319c29f053f274593ebbd9',
  })
  public sentRequestForFriends: string[];

  @Expose()
  @ApiProperty({
    description: 'The Ids of users from whom the request to be friends is received ',
    example: ' 64319c29f053f274593ebbd9',
  })
  public gotReuestForFriends: string[];

}



