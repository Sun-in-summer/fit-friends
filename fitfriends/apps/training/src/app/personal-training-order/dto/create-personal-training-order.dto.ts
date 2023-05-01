
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined,  IsMongoId } from 'class-validator';





export class CreatePersonalTrainingOrderDto {


  @ApiProperty({
    description: 'The Id of  coach or other  customer to whom the request is being sent ',
    example: true
  })
  @IsDefined()
  @IsMongoId()
  conductorId: string;


}
