import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards, Req, UseFilters, RawBodyRequest } from '@nestjs/common';
import { FitTrainingService } from './fit-training.service';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { fillObject } from '@fitfriends/core';
import { CreatedFitTrainingRdo } from './rdo/created-fit-training.rdo';
import { RolesGuard } from '@fitfriends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fitfriends/shared-types';
import { Role } from './decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';




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
  @ApiBearerAuth()
  // @Role(UserRole.Coach)
  @Role('тренер')
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

  // @Patch('/:id')
  // async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
  //   const trainingId = parseInt(id, 10);
  //   const updatedCategory = await this.fitTrainingService.updateTraining(trainingId, dto)
  //   return fillObject(CreatedFitTrainingRdo, updatedCategory);
  // }
}
