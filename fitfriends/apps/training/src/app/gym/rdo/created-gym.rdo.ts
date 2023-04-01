import { GymDescriptionLength, GymFeature, GymLocation, GymNameLength, IMAGE_URL_REG_EXP, TrainingPrice } from '@fitfriends/shared-constants';
import { Gym } from '@fitfriends/shared-types';
import {ApiProperty} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, Min, MinLength} from 'class-validator';


export class CreatedGymRdo implements Gym {
  @Expose()
  @ApiProperty({
    description: 'id of Gym',
    example: '1',
  })
  id?: number;

  @Expose()
  @ApiProperty({
    description: 'Gym\'s  name',
    example: 'Super-gym',
    required: true
  })
  @IsDefined()
  @IsString()
  @MinLength(GymNameLength.Min)
  @MaxLength(GymNameLength.Max)
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Location  of gym',
    example: 'одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная»',
    required: true
  })
  @IsEnum(GymLocation)
  @IsDefined()
  location: string;

  @Expose()
  @ApiProperty({
    description: 'Is the gym verified?',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @Expose()
  @ApiProperty({
    description: 'Features  of gym',
    example: 'одно или несколько значений из списка: бассейн, бесплатная парковка, детская комната, массаж',
    required: true
  })
  @IsEnum(GymFeature, {each: true})
  @IsDefined()
  features: string[];

  @Expose()
  @ApiProperty({
    description: 'Photos of gym',
    example: '1.png',
    required: true
  })
  @IsDefined()
  @Matches(IMAGE_URL_REG_EXP)
  @IsString()
  photos: string[];

  @Expose()
  @ApiProperty({
    description: 'One training\'s price ',
    example: '100 ',
    required: true
  })
  @IsDefined()
  @IsInt()
  @Min(TrainingPrice.Min)
  oneTrainingPrice: number;

  @Expose()
  @ApiProperty({
    description: 'Description of  this training ',
    example: 'This training helps to  looase weight',
    required: true
  })
  @IsNotEmpty()
  @Length(GymDescriptionLength.Min, GymDescriptionLength.Max )
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The date of creation of this gym',
    example: true
  })
  @IsOptional()
  createdAt: Date;
}
