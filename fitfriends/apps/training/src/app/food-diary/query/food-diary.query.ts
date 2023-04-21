import {  IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {  FoodDiaryPagination} from '@fitfriends/shared-constants';


export class FoodDiaryQuery {
  @Transform(({value})=> +value || FoodDiaryPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = FoodDiaryPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = FoodDiaryPagination.DefaultPageCount;

}
