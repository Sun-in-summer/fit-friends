import { SoldTraining, Training } from '../training.interface';


export type  Coach  = {
  trainingLevel: string;
  trainingType: string[];
  certificate: string;
  credits?: string;
  isReadyToTrainPersonally?: boolean;
  role: string;
  myTrainings?: Training[]
  mySoldTrainings?: SoldTraining[]
}
