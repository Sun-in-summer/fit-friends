import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { FitTrainingService } from './fit-training.service';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { fillObject } from '@fitfriends/core';
import { CreatedFitTrainingRdo } from './rdo/created-fit-training.rdo';


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
  async index() {
    const trainings = await this.fitTrainingService.getTrainings();
    return fillObject(CreatedFitTrainingRdo, trainings);
  }

  @Post('/')
  async create(@Body() dto: CreateFitTrainingDto) {
    const newTraining = await this.fitTrainingService.createTraining(dto);
    return fillObject(CreatedFitTrainingRdo, newTraining);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const trainingId = parseInt(id, 10);
    this.fitTrainingService.deleteTraining(trainingId);
  }

  // @Patch('/:id')
  // async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
  //   const trainingId = parseInt(id, 10);
  //   const updatedCategory = await this.fitTrainingService.updateTraining(trainingId, dto)
  //   return fillObject(CreatedFitTrainingRdo, updatedCategory);
  // }
}
