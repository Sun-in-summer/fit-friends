
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from 'libs/shared-types/src/lib/order.types/order-status.enum';




export class UpdateStatusPersonalTrainingOrderDto {
  @ApiProperty({
    description: 'Id of the personal trainign order',
    example: '1',
  })
  @IsInt()
  id?: number;


  @ApiProperty({
    description: 'The status of personal training order',
    example: 'Approved',//
    required: true
  })
  @IsEnum(OrderStatus)
  @IsDefined()
  status: OrderStatus;

}
