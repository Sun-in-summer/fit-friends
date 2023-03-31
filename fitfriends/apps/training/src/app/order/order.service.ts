import { Order, Training } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';


@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(dto: CreateOrderDto, userId: string): Promise<Order> {


    const orderEntity = new OrderEntity({...dto, userId: userId } );
    return this.orderRepository.create(orderEntity);
  }

  async deleteOrder(id: number): Promise<void> {
    this.orderRepository.destroy(id);
  }



   async getOrderById(id: number, userId: string ): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (order.userId !== userId) {
      console.log("order.userId" , order.userId );
      console.log("userId", userId);
      throw new UnauthorizedException()
  }
    return  order;
  }



  async getOrders(query: OrderQuery, userId: string): Promise<Order[]> {

    return this.orderRepository.find(query, userId);
  }

  async updateOrder(id: number, dto: CreateOrderDto, userId: string): Promise<Order> {
    const existOrder = await this.getOrderById(id, userId);
   console.log('existOrder');

    if (existOrder.userId !== userId) {
      console.log(existOrder.userId);
      console.log(userId);
      throw new ForbiddenException('Редактировать заказ может только автор заказа');
    }

    return this.orderRepository.update(id, new OrderEntity(dto));
  }
}
