import { TrainingType } from './training.types/training-type.enum';
import { TrainingLevel } from './training.types/training-level.enum';
import { TrainingTime } from './training.types/training-time.enum';
import { TrainingForGender } from './training.types/traning-for-gender';
import { Review } from './review.interface';
import { Order } from './order.interface';



export interface Training {
  id?: number;
  title: string;
  backgroundImage: string;
  trainingLevel: TrainingLevel;
  traingingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  calories: number;
  description: string;
  trainingForGender: TrainingForGender;
  video: string;
  rating: number;
  coachId?: number;
  isSpecialOffer: boolean;
  reviews: Review[];
  orders: Order[];
  createdAt: Date;
}

export interface SoldTraining extends Training {
   soldTrainingQty: number;
   sum: number;
}
