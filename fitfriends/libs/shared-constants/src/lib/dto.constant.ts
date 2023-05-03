export enum TrainingTypesQty  {
  Min = 1,
  Max = 2
}


export enum CaloriesToDrop {
  Min = 1000,
  Max = 5000
}

export enum CaloriesToSpendADay {
  Min = 1000,
  Max = 5000
}

export enum CoachCreditsLength {
  Min = 10,
  Max = 140
}


export enum UserNameLength {
  Min = 1,
  Max = 15
}


export enum PasswordLength {
  Min = 6,
  Max= 12
}

export enum TrainingTitleLength {
  Min = 1,
  Max = 15
}


export enum GymNameLength {
  Min = 1,
  Max = 15
}
export enum TrainingPrice {
  Min = 0,
}

export enum TrainingDescriptionLength {
  Min  = 10,
  Max = 140
}

export enum GymDescriptionLength {
  Min  = 1,
  Max = 140
}

export enum GymLocation {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvezdnaya ='Звёздная',
  Sportivnaya = 'Спортивная'
}


export enum GymFeature {
  SwimmingPool = 'бассейн',
  FreeParking = 'бесплатная парковка',
  KidsRoom = 'детская комната',
  Massage = 'массаж',
}

export const IMAGE_URL_REG_EXP = /^.+(?:.jpg)|.+(?:.png)$/ ;
export const VIDEO_URL_REG_EXP = /^.+(?:.mov)|.+(?:.avi)|.+(?:.mp4)$/;

export const DEFAULT_RATING = 0;
export const MIN_RATING = 0;
export const MAX_RATING = 5;


export enum ApiPropertyDescriptions {
  UserId = 'Id of the user',
  UserIdExample =  "64319c29f053f274593ebbd9",
  TrainingId = "Id of the training",
  IntIdExample = '1',
  ReviewId = 'Id of the review',
  Rating = "Rating",
  RatingExample= '3',
  ReviewText = 'The text of the review',
  ReviewTextExample = 'It was a great experience',
  CreatedAt = 'The date when this entity was created',
  CreatedAtExample = '2023-05-01 20:03:48.876'

}


export enum DtoErrorMessage {
  RatingNotValid = 'Rating mus be between 0 and 5, integer'
}
