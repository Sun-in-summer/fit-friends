import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class UserGymsRdo {
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  @ApiProperty({
    description: 'The uniq gym ID',
    example: '13'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Gym\'s name',
    example: 'Sportivnaya'
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'Gym\'s location',
    example: 'Udelnaya'
  })
  public location: string;

  @Expose()
  @ApiProperty({
    description: 'Gym\'s description',
    example: 'The best gym ever'
  })
  public description: string;

}



