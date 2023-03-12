import { UserRole } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CoachDto } from './coach.dto';
import { TraineeDto } from './trainee.dto';


export class UserDetailsBaseDto {

  @IsEnum(UserRole)
  @ApiProperty({
    description: 'The role of the user:  trainee or coach',
    required: true,
  })
  public role: UserRole;
}


export type UserDetailsDto = TraineeDto | CoachDto



