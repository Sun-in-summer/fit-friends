import { UserRole } from '../user-role.enum';
import { TrainingType } from '../training.types/trainging-type.enum';
import { TrainingLevel } from '../training.types/training-level.enum';
import { SoldTraining, Training } from '../training.interface';


export type  Coach  = {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  certificate: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
  role: UserRole;
  myTrainings: Training[]
  mySoldTrainings?: SoldTraining[]
}
