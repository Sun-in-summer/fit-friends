
export interface TrainingNotification {
  id?: string;
  coachId: string;
  coachName: string;
  trainingId: number
  trainingTitle: string;
  lastNotification: Date;
}
