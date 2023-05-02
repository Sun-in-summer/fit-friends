
import { ApiPropertyDescriptions } from '@fitfriends/shared-constants';
import { Review } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



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
  userId: string;

  @ApiProperty({
    description: ApiPropertyDescriptions.TrainingId,
    example: ApiPropertyDescriptions.IntIdExample
  })
  trainingId: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.Rating,
    example: ApiPropertyDescriptions.RatingExample
  })
  rating: number;

  @ApiProperty({
    description: ApiPropertyDescriptions.ReviewText,
    example: ApiPropertyDescriptions.ReviewTextExample
  })
  text: string;

  @ApiProperty({
    description: ApiPropertyDescriptions.CreatedAt,
    example: ApiPropertyDescriptions.CreatedAtExample
  })
  createdAt: Date;

}
