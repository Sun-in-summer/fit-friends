import {  Subscription } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsInt, IsOptional} from 'class-validator';
import { Expose } from 'class-transformer';



export class CreatedFitSubscriptionRdo  implements Subscription {

  @Expose()
  @ApiProperty({
    description: 'id of subscription',
    example: '5 ',
    required: true
  })
  @IsOptional()
  @IsInt()
  id?: number;

  @Expose()
  @ApiProperty({
    description: 'Number of  training  ',
    example: '2 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  trainingId: number;

  @Expose()
  @ApiProperty({
    description: 'Qty of  trainings included ',
    example: '5 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  trainingsQtyIncluded: number;
}
