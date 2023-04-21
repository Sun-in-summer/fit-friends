import { FoodDiary, Meal } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsEnum, IsInt, IsOptional, IsString} from 'class-validator';


export class CreateFoodDiaryDto implements FoodDiary {

  @ApiProperty({
    description: 'userId',
    example: '1',
  })
  userId: string;

  @ApiProperty({
    description: 'id of Gym',
    example: '1',
  })
  id?: number;

  @ApiProperty({
    description: 'Meal\'s  title',
    example: 'Dinner',
    required: true
  })
  @IsDefined()
  @IsString()
  @IsEnum(Meal)
  meal: string;


  @ApiProperty({
    description: 'Calories quantity in meal ',
    example: '100 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  caloriesQty: number;




  @ApiProperty({
    description: 'The date of creation of this food diary',
    example: true
  })
  @IsOptional()
  createdAt: Date;


  @ApiProperty({
    description: 'The date of updating of this food diary',
    example: true
  })
  @IsOptional()
  updateddAt: Date;

  @ApiProperty({
    description: 'The date of the meal',
    example: true
  })
  @IsOptional()
  date: Date;
}
