import { Order, OrderType, PaymentMethod } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {IsDefined, IsEnum, IsInt, IsMongoId,  IsOptional} from 'class-validator';


export class CreatedOrderRdo implements Order {
  @Expose()
  @ApiProperty({
    description: 'Order\'s id',
    example: '1',
  })
  @IsDefined()
  id?: number;

  @Expose()
  @ApiProperty({
    description: 'User\'s id ',
    example: '6416c69d7be04eac59a9987c',
    required: true
  })
  @IsDefined()
  @IsMongoId()
  userId: string;


  @Expose()
  @ApiProperty({
    description: 'Type: membership card or  some quantity of trainings',
    example: 'membership card',
    required: true
  })
  @IsDefined()
  @IsEnum(OrderType)
  orderType: string;

  @Expose()
  @ApiProperty({
    description: 'Training id ',
    example: '1',
    })
  @IsOptional()
  @IsInt()
  trainingId?: number;

  @Expose()
  @ApiProperty({
    description: 'Gym id ',
    example: '1',
    })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @Expose()
  @ApiProperty({
    description: 'Gym id ',
    example: '1',
    required: true
    })
  @IsDefined()
  @IsInt()
  quantity: number;

  @Expose()
  @ApiProperty({
    description: 'Price ',
    example: '1000',
    required: true
    })
  @IsDefined()
  @IsInt()
  price: number;

  @Expose()
  @ApiProperty({
    description: 'Price ',
    example: '1000',
    })
  @IsOptional()
  @IsInt()
  amount: number;


  @Expose()
  @ApiProperty({
    description: 'Payment way:  mir, visa , etc. ',
    example: 'mir',
    required: true
    })
  @IsDefined()
  @IsEnum(PaymentMethod)
  paymentWay: string;


  @Expose()
  @ApiProperty({
    description: 'The date of creation of this training',
    example: true
  })
  @IsOptional()
  createdAt: Date;

}
