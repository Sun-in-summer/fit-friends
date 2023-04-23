import { IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {  FitSubscriptionPagination} from '@fitfriends/shared-constants';


export class SubscriptionQuery {
  @Transform(({value})=> +value || FitSubscriptionPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = FitSubscriptionPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = FitSubscriptionPagination.DefaultPageCount;

}
