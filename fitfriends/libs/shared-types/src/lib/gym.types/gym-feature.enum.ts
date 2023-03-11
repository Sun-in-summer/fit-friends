export enum GymFeature {
  SwimmingPool = 'бассейн',
  FreeParking = 'бесплатная парковка',
  KidsRoom = 'детская комната',
  Massage = 'массаж',
}

export type GymFeatureType = keyof typeof GymFeature;
