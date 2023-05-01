import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards, Req,  Query, Patch  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { RequestWithTokenPayload, TokenPayload, User } from '@fitfriends/shared-types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PersonalTrainingOrderService } from './personal-training-order.service';
import { CreatedPersonalTrainingOrderRdo } from './rdo/created-personal-training.rdo';
import { PersonalTrainingOrderQuery } from './query/personal-training-order.query';
import { CreatePersonalTrainingOrderDto } from './dto/create-personal-training-order.dto';
import { UpdatePersonalTrainingOrderDto } from './dto/update-personal-training-order.dto';
import { UpdateStatusPersonalTrainingOrderDto } from './dto/update-status-personal-training-order.dto';


@Controller('personal-training-order')
export class PersonalTrainingOrderController {
  constructor(
    private readonly personalTrainingOrderService: PersonalTrainingOrderService,

  ) {}

  @Get('/:id')
  async show(
    @Param('id') id: string,
     @Req() _req: RequestWithTokenPayload<User>) {
    const personalTrainginOrderId = parseInt(id, 10);
    const existPersonalTrainingOrder = await this.personalTrainingOrderService.getPersonalTrainingOrderById(personalTrainginOrderId);
    const training=  fillObject(CreatedPersonalTrainingOrderRdo, existPersonalTrainingOrder);
    return training;
  }


  @Get('/')
  async index(@Query () query: PersonalTrainingOrderQuery
) {
    const personalTrainginOrders = await this.personalTrainingOrderService.getPersonalTrainingOrders(query);
    return fillObject(CreatedPersonalTrainingOrderRdo, personalTrainginOrders);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) dto: CreatePersonalTrainingOrderDto,
    @Req() req: RequestWithTokenPayload<TokenPayload>,
  ) {
    const userId = req.user.sub;
    const newPersonalTrainingOrder = await this.personalTrainingOrderService.createPersonalTrainingOrder(dto, userId);
    return fillObject(CreatedPersonalTrainingOrderRdo, newPersonalTrainingOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const personalTrainginOrderId = parseInt(id, 10);
    this.personalTrainingOrderService.deletePersonalTrainingOrder(personalTrainginOrderId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePersonalTrainingOrderDto,
    @Req() req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const personalTrainginOrderId = parseInt(id, 10);
    const updatedPersonalTrainginOrder = await this.personalTrainingOrderService.updatePersonalTrainingOrder(personalTrainginOrderId, dto, userId)
    return fillObject(CreatedPersonalTrainingOrderRdo, updatedPersonalTrainginOrder);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusPersonalTrainingOrderDto,
    @Req() req: RequestWithTokenPayload<TokenPayload>) {
    const conductorId = req.user.sub;
    const personalTrainginOrderId = parseInt(id, 10);
    const updatedPersonalTrainginOrder = await this.personalTrainingOrderService.updatePersonalTrainingOrderStatus(personalTrainginOrderId, dto, conductorId)
    return fillObject(CreatedPersonalTrainingOrderRdo, updatedPersonalTrainginOrder);
  }

}
