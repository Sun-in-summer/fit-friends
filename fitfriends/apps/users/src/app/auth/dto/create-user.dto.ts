import { Gender, UserRole, Place} from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Coach } from 'libs/shared-types/src/lib/user-role.types/coach.type';
import { Trainee } from 'libs/shared-types/src/lib/user-role.types/trainee.type';

export class CreateUserDto {
   @ApiProperty({
    description: 'User firstname',
    example: 'Ivan'
  })
  public firstname: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

   @ApiProperty({
    description: 'User avatar',
    example: '1.img'
  })
  public avatar: string;

   @ApiProperty({
    description: 'User dateBirth',
    example: '1981-03-12',
  })
  public dateBirth: Date;

   @ApiProperty({
    description: 'User gender',
    example: 'Male/Female/NoInfo'
  })
  public gender: Gender;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

   @ApiProperty({
    description: 'User role: coach or trainee',
    example: 'Coach'
  })
  public role: UserRole;

   @ApiProperty({
    description: 'Prefferred gym place',
    example: 'Udelnaya'
  })
  public place: Place;

   @ApiProperty({
    description: 'Detailed info about trainings',
  })
  public traineeOrCoach: Trainee | Coach;
}
