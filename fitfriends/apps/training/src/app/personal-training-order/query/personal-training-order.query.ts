import {  IsEnum, IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {   PersonalTrainingOrderPagination, PersonalTrainingOrderSortDirection} from '@fitfriends/shared-constants';



export class PersonalTrainingOrderQuery {
  @Transform(({value})=> +value || PersonalTrainingOrderPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = PersonalTrainingOrderPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = PersonalTrainingOrderPagination.DefaultPageCount;

  @Transform(({value})=> +value || PersonalTrainingOrderSortDirection.Default)
  @IsEnum(PersonalTrainingOrderSortDirection)
  @IsOptional()
  public sortDirection?: PersonalTrainingOrderSortDirection.Desc| PersonalTrainingOrderSortDirection.Asc = PersonalTrainingOrderSortDirection.Default;


}
