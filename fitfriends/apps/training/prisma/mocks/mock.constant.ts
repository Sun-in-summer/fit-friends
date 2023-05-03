export const DEFAULT_IMAGE_COUNT =2;
export const DEFAULT_MOCK_RECORDS_QTY = 10;
export const  DefaultGymPrice=  {
  Min : 100,
  Max: 1000
}

export const  DefaultTrainingPrice=  {
  Min : 0,
  Max: 5000
}

export const  DefaultCaloriesQty=  {
  Min : 1000,
  Max: 5000
}

export const Rating = {
  Min: 0,
  Max: 5
}

export const  GymFeaturesNames =[
  'бассейн',
  'массаж',
  'детская комната',
  'бесплатная парковка',
] as const;

export const  GymLocationStations =[
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная'
] as const;

export const TrainingLevelNames = [
  "новичок",
  "любитель",
  "профессиональ",
] as const;

export const TrainingTimeNames = [
 "10-30 мин",
  "30-50 мин",
 "50-80 мин",
 "больше 80 мин",
] as const;


export const TrainingTypeNames = [
  "йога",
  "бег",
  "бокс",
  "стрейчинг",
  "кроссфит",
  "аэробика",
  "пилатес"
] as const;


export const TrainingForGenderNames = [
 "для мужчин",
 "для женщин",
  "для всех",
] as const;
