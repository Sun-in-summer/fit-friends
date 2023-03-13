import { UserRole } from '../user-role.enum';
import { TrainingType } from '../training.types/training-type.enum';
import { TrainingTime } from '../training.types/training-time.enum';
import { TrainingLevel } from '../training.types/training-level.enum';



export type  Trainee  = {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingTime: TrainingTime;
  caloriesToDrop: number;
  caloriesToSpendPerDay: number;
  isReadyForTraining: boolean;
  role: UserRole;
}
