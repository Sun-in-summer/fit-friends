import { ApiProperty } from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class LoggedUserRdo {
  @Expose({name: '_id'})
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'Access token',
    example: 'user4541661617@uter'
  })
  public accessToken: string;



}
