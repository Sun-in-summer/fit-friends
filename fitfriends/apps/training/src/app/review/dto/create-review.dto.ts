
import { ApiPropertyDescriptions, DtoErrorMessage, MAX_RATING, MIN_RATING } from '@fitfriends/shared-constants';
import { Review } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsOptional, IsString, Max, Min } from 'class-validator';



export class CreateReviewDto implements Review {
  @ApiProperty({
    description: ApiPropertyDescriptions.ReviewId,
    example: ApiPropertyDescriptions.IntIdExample
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: ApiPropertyDescriptions.TrainingId,
    example: ApiPropertyDescriptions.IntIdExample
  })
  @IsInt()
  trainingId: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.Rating,
    example: ApiPropertyDescriptions.RatingExample
  })
  @Max(MAX_RATING, { message: DtoErrorMessage.RatingNotValid })
  @Min(MIN_RATING, { message: DtoErrorMessage.RatingNotValid })
  rating: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.ReviewText,
    example: ApiPropertyDescriptions.ReviewTextExample
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: ApiPropertyDescriptions.CreatedAt,
    example: ApiPropertyDescriptions.CreatedAtExample
  })
  createdAt: Date;

}
