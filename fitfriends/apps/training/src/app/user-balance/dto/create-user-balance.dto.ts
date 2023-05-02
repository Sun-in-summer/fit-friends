
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import { UserBalance } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { IsDefined,  IsInt, IsMongoId, IsOptional} from 'class-validator';


export class CreateUserBalanceDto implements UserBalance {

  @ApiProperty({
    description: 'id of user balance ',
    example: '1',
  })
  public id?: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'subscription id ',
    example: '101 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  public subscriptionId: number;


  @ApiProperty({
    description: 'The quantity of available subsriptions ',
    example: true
  })
  @IsInt()
  public subscriptionAvaliable: number;


  @ApiProperty({
    description: 'The date of updating of this user balance',
    example: true
  })
  @IsOptional()
  public updatedAt: Date;

 @ApiProperty({
    description: 'The quantity of  subsriptions spent ',
    example: true
  })
  @IsInt()
  public subscriptionSpent: number;

  @ApiProperty({
    description: 'The training  Id',
    example: true
  })
  @IsInt()
  public trainingId: number;

  @ApiProperty({
    description: 'The quantity of trainings available',
    example: true
  })
  @IsInt()
  public trainingAvaliable: number;


  @ApiProperty({
    description: 'The quantity of trainings spent',
    example: true
  })
  @IsInt()
  public trainingSpent: number;


}
