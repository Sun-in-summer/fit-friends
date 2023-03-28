import {  IsEnum,  IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {  DefaultPagination, OrderSortBy,  PrismaSortDirection, } from '@fitfriends/shared-constants';


export class OrderQuery {
  @Transform(({value})=> +value || DefaultPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefaultPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = DefaultPagination.DefaultPageCount;

  @Transform(({value})=> +value || PrismaSortDirection.Default)
  @IsEnum(PrismaSortDirection)
  @IsOptional()
  public sortDirection?: PrismaSortDirection.Desc| PrismaSortDirection.Asc = PrismaSortDirection.Default;


  @IsOptional()
  @IsEnum(OrderSortBy)
  public sortBy?: OrderSortBy.Amount | OrderSortBy.Quantity = OrderSortBy.Quantity;

}
