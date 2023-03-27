import {  IsEnum, IsInt, IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {  Price, Rating, TrainingPagination, TraningSortDirection } from '@fitfriends/shared-constants';
import { SortByType} from '@fitfriends/shared-constants';
import { TrainingType } from '@fitfriends/shared-types';
import { TrainingTime } from 'libs/shared-types/src/lib/training.types/training-time.enum';
import { transformToMax, transformToMin } from '@fitfriends/core';

export class TrainingQuery {
  @Transform(({value})=> +value || TrainingPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = TrainingPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = TrainingPagination.DefaultPageCount;

  @Transform(({value})=> +value || TraningSortDirection.Default)
  @IsEnum(TraningSortDirection)
  @IsOptional()
  public sortDirection?: TraningSortDirection.Desc| TraningSortDirection.Asc = TraningSortDirection.Default;


  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.TrainingLevel | SortByType.Place = SortByType.Date;



  @IsOptional()
  @IsEnum(TrainingType, { each: true })
  @Transform(({ value }) => value.split(','))
  public trainingType: TrainingType[] =[TrainingType.Boxing];


  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMin?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public priceMax?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMin(value, Rating.Min, Rating.Max))
  @IsOptional()
  public ratingMin?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMax(value, Rating.Min, Rating.Max))
  @IsOptional()
  public ratingMax?: number;

  @IsInt({ each: true })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  calories?: number[];

  @IsEnum(TrainingTime, {
      each: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(',');
  })
  public trainingTime?: TrainingTime[];

}
