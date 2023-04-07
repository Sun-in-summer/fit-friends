export interface UserBalance {
  id?: number;
  userId: string;
  updatedAt?: Date;
  subscriptionId: number;
  subscriptionAvailable: number;
  subscriptionSpent: number;
  trainingId: number;
  trainingAvailable: number;
  trainingSpent: number;
}
