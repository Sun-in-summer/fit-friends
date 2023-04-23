import {  IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {  UserBalancePagination} from '@fitfriends/shared-constants';


export class UserBalanceQuery {
  @Transform(({value})=> +value || UserBalancePagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = UserBalancePagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = UserBalancePagination.DefaultPageCount;

}
