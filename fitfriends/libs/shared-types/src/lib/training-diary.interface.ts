
export interface TrainingDiary {
  id?: number ;
  userId?: string;
  trainingId: number;
  spentCalories: number;
  spentTime: string;
  date: Date;
  updatedAt?: Date;
}

