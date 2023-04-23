import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards } from '@nestjs/common';
import { fillObject,  } from '@fitfriends/core';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FitSubscriptionService } from './fit-subscription.service';
import { CreatedFitSubscriptionRdo } from './rdo/created-fit-subscription.rdo';
import { CreateFitSubscriptionDto } from './dto/create-fit-subscription.dto';


@Controller('fit-subscription')
export class FitSubscriptionController {
  constructor(
    private readonly fitSubscriptionService: FitSubscriptionService,

  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param('id') id: string) {
    const fitSubscriptionId = parseInt(id, 10);
    const existTraining = await this.fitSubscriptionService.getSubscriptionById(fitSubscriptionId);
    const training=  fillObject(CreatedFitSubscriptionRdo, existTraining);
    return training;
  }



  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) dto: CreateFitSubscriptionDto

  ) {

    const newTraining = await this.fitSubscriptionService.createSubscription(dto);
    return fillObject(CreatedFitSubscriptionRdo, newTraining);

  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const fitSubscriptionId = parseInt(id, 10);
    this.fitSubscriptionService.deleteSubscription(fitSubscriptionId);
  }


}
