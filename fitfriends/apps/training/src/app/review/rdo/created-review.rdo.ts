
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import { Review } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';



export class CreatedReviewRdo implements Review {
  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.ReviewId,
    example: ApiPropertyDescriptions.IntIdExample
  })
  @IsOptional()
  id: number;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.UserId,
    example: ApiPropertyDescriptions.UserIdExample
  })
  userId: string;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.TrainingId,
    example: ApiPropertyDescriptions.IntIdExample
  })
  trainingId: number;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.Rating,
    example: ApiPropertyDescriptions.RatingExample
  })
  rating: number;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.ReviewText,
    example: ApiPropertyDescriptions.ReviewTextExample
  })
  text: string;

  @Expose()
  @ApiProperty({
    description: ApiPropertyDescriptions.CreatedAt,
    example: ApiPropertyDescriptions.CreatedAtExample
  })
  createdAt: Date;

}
