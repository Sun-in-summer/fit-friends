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
