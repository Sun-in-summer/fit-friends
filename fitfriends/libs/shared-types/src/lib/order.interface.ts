import { OrderCategory } from './order.types/order-category.enum';
import { PaymentMethod } from './order.types/payment-method.enum';

export interface Order {
  id?: number;
  userId: string;
  orderCategory: OrderCategory;
  service: string;
  price: number;
  quantity: number;
  amount: number;
  paymentWay: PaymentMethod;
  createdAt?: Date;
}
