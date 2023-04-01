
export interface Gym {
  id?: number;
  name: string;
  location: string;
  isVerified?: boolean;
  features: string[];
  photos: string[];
  description: string;
  oneTrainingPrice: number;
  createdAt?: Date;
}
