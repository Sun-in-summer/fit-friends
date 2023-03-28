import { Order, OrderType, PaymentMethod } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsEnum, IsInt, IsMongoId,  IsOptional} from 'class-validator';


export class CreateOrderDto implements Omit<Order, 'amount'> {

  @ApiProperty({
    description: 'Order\'s id',
    example: '1',
  })
  @IsDefined()
  id?: number;

  @ApiProperty({
    description: 'User\'s id ',
    example: '6416c69d7be04eac59a9987c',
    required: true
  })
  @IsDefined()
  @IsMongoId()
  userId: string;


  @ApiProperty({
    description: 'Type: membership card or  some quantity of trainings',
    example: 'membership card',
    required: true
  })
  @IsDefined()
  @IsEnum(OrderType)
  orderType: string;

  @ApiProperty({
    description: 'Training id ',
    example: '1',
    })
  @IsOptional()
  @IsInt()
  trainingId?: number;

  @ApiProperty({
    description: 'Gym id ',
    example: '1',
    })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    description: 'Gym id ',
    example: '1',
    required: true
    })
  @IsDefined()
  @IsInt()
  quantity: number;


  @ApiProperty({
    description: 'Price ',
    example: '1000',
    required: true
    })
  @IsDefined()
  @IsInt()
  price: number;


  @ApiProperty({
    description: 'Price ',
    example: '1000',
    })
  @IsOptional()
  @IsInt()
  amount: number;

   @ApiProperty({
    description: 'Payment way:  mir, visa , etc. ',
    example: 'mir',
    required: true
    })
  @IsDefined()
  @IsEnum(PaymentMethod)
  paymentWay: string;


  @ApiProperty({
    description: 'The date of creation of this training',
    example: true
  })
  @IsOptional()
  createdAt: Date;

}
