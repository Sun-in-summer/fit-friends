export interface UserBalance {
  id?: number;
  userId: string;
  updatedAt?: Date;
  subscriptionId: number;
  subscriptionAvaliable: number;
  subscriptionSpent: number;
  trainingId: number;
  trainingAvaliable: number;
  trainingSpent: number;
}
