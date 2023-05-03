
export interface Review {
  id?: number;
  userId: string;
  trainingId: number;
  rating: number;
  text: string;
  createdAt?: Date;
}
