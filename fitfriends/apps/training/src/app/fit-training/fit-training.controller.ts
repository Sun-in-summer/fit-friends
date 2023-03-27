import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, ValidationPipe, UseGuards, Req,  Query, Patch, UseInterceptors,  } from '@nestjs/common';
import { FitTrainingService } from './fit-training.service';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { fillObject } from '@fitfriends/core';
import { CreatedFitTrainingRdo } from './rdo/created-fit-training.rdo';
import { RolesGuard } from '../guards/roles.guard';
import { RequestWithTokenPayload, TokenPayload, User, UserRole } from '@fitfriends/shared-types';
import { Role } from './decorators/role.decorator';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { TrainingQuery } from './query/training.query';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { UploadedFiles } from '@nestjs/common/decorators';




@Controller('trainings')
export class FitTrainingController {
  constructor(
    private readonly fitTrainingService: FitTrainingService,

  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param('id') id: string, @Req()
req: RequestWithTokenPayload<User>) {
    const user = req.user;
    const trainingId = parseInt(id, 10);
    const existTraining = await this.fitTrainingService.getTrainingById(trainingId);
    const training=  fillObject(CreatedFitTrainingRdo, existTraining);
   console.log(user);
    return training;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('/')
  async index(@Query () query: TrainingQuery, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
  const userId = req.user.sub;
    const trainings = await this.fitTrainingService.getTrainings(query, userId);
    return fillObject(CreatedFitTrainingRdo, trainings);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Post('/')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Role(UserRole.Coach)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'video', maxCount: 1},
    {name: 'backgroundImage', maxCount: 1}
  ]
  ))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) dto: CreateFitTrainingDto,
    @Req() req: RequestWithTokenPayload<TokenPayload>,
    // @UploadedFiles() files: { video?: Express.Multer.File[], backgroundImage?: Express.Multer.File[]}
  ) {
    const userId = req.user.sub;
    // const {video, backgroundImage} = files;
    // const videoFile = video[0].buffer.toString();
    // const backgroundImageFile = backgroundImage[0].buffer.toString();
    const newTraining = await this.fitTrainingService.createTraining(dto, userId);
    return fillObject(CreatedFitTrainingRdo, newTraining);

  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const trainingId = parseInt(id, 10);
    this.fitTrainingService.deleteTraining(trainingId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateFitTrainingDto,  @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const trainingId = parseInt(id, 10);
    const updatedTraining = await this.fitTrainingService.updateTraining(trainingId, dto, userId)
    return fillObject(CreatedFitTrainingRdo, updatedTraining);
  }
}
