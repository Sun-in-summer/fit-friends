import { OrderStatus } from './order.types/order-status.enum';

export  interface personalTrainingOrder {

  id?: string;
  initiatorId: string;
  userId: string;
  createdAt?: Date;
  statusChangeDate: Date;
  status: OrderStatus;

}
