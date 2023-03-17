import { GymFeatureType } from './gym.types/gym-feature.enum';

export interface Gym {
  id?: number;
  name: string;
  location: Location;
  isVerified?: boolean;
  features: GymFeatureType[];
  photos: string[];
  description: string;
  oneTrainingPrice: number;
  createdAt: Date;
}
