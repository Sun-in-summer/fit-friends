import { TrainingType } from './training.types/training-type.enum';
import { TrainingLevel } from './training.types/training-level.enum';
import { TrainingTime } from './training.types/training-time.enum';
import { TrainingForGender } from './training.types/traning-for-gender';



export interface Training {
  _id?: string;
  title: string;
  backgroundImage: string;
  trainingLevel: TrainingLevel;
  traingingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  calories: number;
  trainingForGender: TrainingForGender;
  video: string;
  rating: number;
  coachId?: number;
  isSpecialOffer: boolean;
}

export interface SoldTraining extends Training {
   soldTrainingQty: number;
   sum: number;
}
