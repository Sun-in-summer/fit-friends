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

  @Transform(({value})=> +value || SortDirection.Default)
  @IsIn([1 ,-1])
  @IsOptional()
  public sortDirection?: SortDirection.Desc| SortDirection.Asc = SortDirection.Default;


  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.TrainingLevel | SortByType.Place = SortByType.Date;

  @IsOptional()
  @IsEnum(UserRole)
  public role =UserRole.Coach;

  @IsOptional()
  @IsEnum(TrainingType, { each: true })
  public trainingType: TrainingType[] =[TrainingType.Boxing];




}
