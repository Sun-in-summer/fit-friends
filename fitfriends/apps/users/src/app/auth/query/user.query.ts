import {  IsEnum, IsIn, IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '@fitfriends/shared-constants';
import { UserPagination, SortByType} from '@fitfriends/shared-constants';
import { TrainingType, UserRole } from '@fitfriends/shared-types';

export class UserQuery {
  @Transform(({value})=> +value || UserPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = UserPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = UserPagination.DefaultPageCount;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = SortDirection.Default;


  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.TrainingLevel | SortByType.Place = SortByType.Date;

  @IsOptional()
  @IsEnum(UserRole)
  public role =UserRole.Coach;

  @IsOptional()
  @IsEnum(TrainingType)
  public trainingType: TrainingType[];




}
