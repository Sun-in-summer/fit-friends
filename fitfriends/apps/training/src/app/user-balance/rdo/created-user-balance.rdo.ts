
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import {ApiProperty} from '@nestjs/swagger';
import { UserBalance } from '@prisma/client';
import { Expose } from 'class-transformer';
import {IsDefined,  IsInt, IsMongoId, IsOptional} from 'class-validator';


export class CreatedUserBalanceRdo implements UserBalance {



  @Expose()
  @ApiProperty({
    description: 'id of user balance ',
    example: '1',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsMongoId()
  userId: string;

  @Expose()
  @ApiProperty({
    description: 'subscription id ',
    example: '101 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  subscriptionId: number;

  @Expose()
  @ApiProperty({
    description: 'The quantity of available subsriptions ',
    example: true
  })
  @IsInt()
  subscriptionAvaliable: number;

  @Expose()
  @ApiProperty({
    description: 'The date of updating of this user balance',
    example: true
  })
  @IsOptional()
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The quantity of  subsriptions spent ',
    example: true
  })
  @IsInt()
  subscriptionSpent: number;

  @Expose()
  @ApiProperty({
    description: 'The training  Id',
    example: true
  })
  @IsInt()
  trainingId: number;

  @Expose()
  @ApiProperty({
    description: 'The quantity of trainings available',
    example: true
  })
  @IsInt()
  trainingAvaliable: number;

  @Expose()
  @ApiProperty({
    description: 'The quantity of trainings spent',
    example: true
  })
  @IsInt()
  trainingSpent: number;


}
