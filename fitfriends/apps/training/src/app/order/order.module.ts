import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository]
})
export class OrderModule {}
