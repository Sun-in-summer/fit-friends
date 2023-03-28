export interface Order {
  id?: number;
  userId: string;
  orderType: string;
  trainingId?: number;
  gymId?: number;
  price: number;
  quantity: number;
  amount: number;
  paymentWay: string;
  createdAt?: Date;
}
