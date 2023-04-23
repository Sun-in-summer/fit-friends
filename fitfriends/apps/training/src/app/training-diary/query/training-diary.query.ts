import {  IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingDiaryPagination } from '@fitfriends/shared-constants';



export class TrainingDiaryQuery {
  @Transform(({value})=> +value || TrainingDiaryPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = TrainingDiaryPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = TrainingDiaryPagination.DefaultPageCount;

}
