import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards, Req, UseFilters, RawBodyRequest, Query, Patch } from '@nestjs/common';
import { FitTrainingService } from './fit-training.service';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { fillObject } from '@fitfriends/core';
import { CreatedFitTrainingRdo } from './rdo/created-fit-training.rdo';
import { RolesGuard } from '../guards/roles.guard';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fitfriends/shared-types';
import { Role } from './decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TrainingQuery } from './query/training.query';




@Controller('trainings')
export class FitTrainingController {
  constructor(
    private readonly fitTrainingService: FitTrainingService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const trainingId = parseInt(id, 10);
    const existTraining = await this.fitTrainingService.getTraining(trainingId);
    return fillObject(CreatedFitTrainingRdo, existTraining);
  }

  @Get('/')
  async index(@Query () query: TrainingQuery) {
    const trainings = await this.fitTrainingService.getTrainings(query);
    return fillObject(CreatedFitTrainingRdo, trainings);
  }

  @Post('/')
  @ApiBearerAuth()
  @Role(UserRole.Coach)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) dto: CreateFitTrainingDto, @Req()
req: RequestWithTokenPayload<TokenPayload>
  ) {
    const userId = req.user.sub;
    const newTraining = await this.fitTrainingService.createTraining(dto, userId);
    return fillObject(CreatedFitTrainingRdo, newTraining);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const trainingId = parseInt(id, 10);
    this.fitTrainingService.deleteTraining(trainingId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateFitTrainingDto) {
    const trainingId = parseInt(id, 10);
    const updatedTraining = await this.fitTrainingService.updateTraining(trainingId, dto)
    return fillObject(CreatedFitTrainingRdo, updatedTraining);
  }
}
