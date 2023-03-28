import { Order, Training } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
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



   async getOrderById(id: number, ): Promise<Order> {
    const order = this.orderRepository.findById(id);
    return  order;
  }



  async getOrders(query: OrderQuery, userId: string): Promise<Order[]> {

    return this.orderRepository.find(query, userId);
  }

  async updateOrder(id: number, dto: CreateOrderDto, userId: string): Promise<Order> {
    const existOrder = await this.getOrderById(id);

    if (existOrder.userId !== userId) {
      throw new ForbiddenException('Редактировать заказ может только автор заказа');
    }

    return this.orderRepository.update(id, new OrderEntity(dto));
  }
}
