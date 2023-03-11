

export interface Comment {
  id?: string;
  userId: string;
  trainingId: string;
  rating: number;
  text: string;
  createdAt? : Date

}
