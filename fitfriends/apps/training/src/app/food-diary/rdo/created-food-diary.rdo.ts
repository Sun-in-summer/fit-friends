
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import { FoodDiary, Meal } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {IsDefined, IsEnum, IsInt, IsOptional, IsString} from 'class-validator';


export class CreatedFoodDiaryRdo implements FoodDiary {
  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  userId: string;

  @Expose()
  @ApiProperty({
    description: 'id of Gym',
    example: '1',
  })
  id?: number;

  @Expose()
  @ApiProperty({
    description: 'Meal\'s  title',
    example: 'Dinner',
    required: true
  })
  @IsDefined()
  @IsString()
  @IsEnum(Meal)
  meal: string;

  @Expose()
  @ApiProperty({
    description: 'Calories quantity in meal ',
    example: '100 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  caloriesQty: number;

  @Expose()
  @ApiProperty({
    description: 'The date of creation of this food diary',
    example: true
  })
  @IsOptional()
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date of updating of this food diary',
    example: true
  })
  @IsOptional()
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date of the meal',
    example: true
  })
  @IsOptional()
  date: Date;
}
