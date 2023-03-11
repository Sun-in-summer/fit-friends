import { ApiProperty } from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class LoggedUserRdo {
  @Expose({name: '_id'})
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
