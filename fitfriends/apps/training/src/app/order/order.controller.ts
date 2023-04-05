import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards, Req,  Query, Patch  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { RolesGuard } from '../guards/roles.guard';
import { RequestWithTokenPayload, TokenPayload } from '@fitfriends/shared-types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { CreatedOrderRdo } from './rdo/created-order.rdo';
import { OrderQuery } from './query/order.query';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,

  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param('id') id: string, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const {user} =req;
    const userId = user.sub;
    const orderId = parseInt(id, 10);
    const existOrder = await this.orderService.getOrderById(orderId, userId);
    const order=  fillObject(CreatedOrderRdo, existOrder);
    return order;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('/')
  async index(@Query () query: OrderQuery, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const {user} =req;
    const userId = user.sub;
    const orders = await this.orderService.getOrders(query, userId);
    return fillObject(CreatedOrderRdo, orders);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Post('/')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) dto: CreateOrderDto,
    @Req() req: RequestWithTokenPayload<TokenPayload>,
  ) {
    const userId = req.user.sub;
    const newOrder = await this.orderService.createOrder(dto, userId);
    return fillObject(CreatedOrderRdo, newOrder);

  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    this.orderService.deleteOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateOrderDto,  @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const orderId = parseInt(id, 10);
    const updatedOrder = await this.orderService.updateOrder(orderId, dto, userId)
    return fillObject(CreatedOrderRdo, updatedOrder);
  }


}
