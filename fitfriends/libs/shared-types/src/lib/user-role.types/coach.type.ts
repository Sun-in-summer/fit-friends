import { UserRole } from '../user-role.enum';
import { TrainingType } from '../training.types/trainging-type.enum';
import { TrainingLevel } from '../training.types/training-level.enum';


export type  Coach  = {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  certificate: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
  role: UserRole;
}
