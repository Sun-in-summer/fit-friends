import { Review } from './review.interface';
import { Order } from './order.interface';



export interface Training {
  id?: number;
  title: string;
  backgroundImage: string;
  trainingLevel: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  calories: number;
  description: string;
  trainingForGender: string;
  video: string;
  rating: number;
  coachId?: string;
  isSpecialOffer: boolean;
  reviews?: Review[];
  orders?: Order[];
  createdAt?: Date;
}

export type CreateTraining = Omit<
  Training,
  'id' | 'backgroundImage' | 'rating' | 'video'
>;

export interface SoldTraining extends Training {
   soldTrainingQty: number;
   sum: number;
}
