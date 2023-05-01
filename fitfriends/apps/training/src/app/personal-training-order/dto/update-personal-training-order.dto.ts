import { PersonalTrainingOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsISO8601, IsInt, IsMongoId } from 'class-validator';
import { OrderStatus } from 'libs/shared-types/src/lib/order.types/order-status.enum';




export class UpdatePersonalTrainingOrderDto implements PersonalTrainingOrder {
  @ApiProperty({
    description: 'Id of the personal trainign order',
    example: '1',
  })
  @IsInt()
  id?: number;

 @ApiProperty({
    description: 'The id of  person who requests personal training order',
    example: true
  })
  @IsDefined()
  @IsMongoId()
  initiatorId: string;


  @ApiProperty({
    description: 'The Id of  coach or other  customer to whom the request is being sent ',
    example: true
  })
  @IsDefined()
  @IsMongoId()
  conductorId: string;


  @ApiProperty({
    description: 'The date of change of status of this personal training order',
    example: true
  })
  @IsISO8601()
  statusChangeDate: Date;

  @ApiProperty({
    description: 'The status of personal training order',
    example: 'Approved',//
    required: true
  })
  @IsEnum(OrderStatus)
  @IsDefined()
  status: OrderStatus;

}
