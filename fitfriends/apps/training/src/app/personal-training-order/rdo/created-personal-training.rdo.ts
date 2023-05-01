import { PersonalTrainingOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsEnum, IsISO8601, IsInt, IsMongoId, IsOptional } from 'class-validator';
import { OrderStatus } from 'libs/shared-types/src/lib/order.types/order-status.enum';




export class CreatedPersonalTrainingOrderRdo implements PersonalTrainingOrder {
  @Expose()
  @ApiProperty({
    description: 'Id of the personal trainign order',
    example: '1',
  })
  @IsInt()
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The id of  person who requests personal training order',
    example: true
  })
  @IsDefined()
  @IsMongoId()
  initiatorId: string;

  @Expose()
  @ApiProperty({
    description: 'The Id of  coach or other  customer to whom the request is being sent ',
    example: true
  })
  @IsDefined()
  @IsMongoId()
  conductorId: string;

  @Expose()
  @ApiProperty({
    description: 'The date of change of status of this personal training order',
    example: true
  })
  @IsISO8601()
  statusChangeDate: Date;

  @Expose()
  @ApiProperty({
    description: 'The status of personal training order',
    example: 'Approved',//
    required: true
  })
  @IsEnum(OrderStatus)
  @IsDefined()
  status: OrderStatus;


  @Expose()
  @ApiProperty({
    description: 'The date of creation of this personal training order',
    example: true
  })
  @IsOptional()
  @IsISO8601()
  public createdAt: Date;

}
