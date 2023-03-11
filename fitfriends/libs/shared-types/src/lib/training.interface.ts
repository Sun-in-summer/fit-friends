import { Gender } from './gender.enum';
import { TrainingType } from './training.types/trainging-type.enum';
import { TrainingLevel } from './training.types/training-level.enum';
import { TrainingTime } from './training.types/training-time.enum';



export interface Training {
  _id?: string;
  title: string;
  backgroundImage: string;
  trainingLevel: TrainingLevel;
  traingingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  calories: number;
  gender: Gender;
  video: string;
  rating: number;
  coachId?: number;
  isSpecialOffer: boolean;
}
