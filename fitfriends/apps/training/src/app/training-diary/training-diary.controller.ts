import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch,  Req, UseGuards, Query  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { RequestWithTokenPayload, TokenPayload } from '@fitfriends/shared-types';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TraineeRoleGuard } from '../guards/trainee-role.guard';
import { TrainingDiaryQuery } from './query/training-diary.query';
import { TrainingDiaryService } from './training-diary.service';
import { CreatedTrainingDiaryRdo } from './rdo/created-training-diary.rdo';


@Controller('training-diary')
export class TrainingDiaryController {
  constructor(
    private readonly trainingDiaryService: TrainingDiaryService
  ) {}



  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Post('/')
  async create(@Body() dto: CreateTrainingDiaryDto, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const newCategory = await this.trainingDiaryService.createTrainingDiary(dto, userId);
    return fillObject(CreatedTrainingDiaryRdo, newCategory);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/')
  async getTrainingDiariesForUser(@Query () query: TrainingDiaryQuery, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const existTrainingDiary = await this.trainingDiaryService.getTrainingDiariesByUserId(userId, query);
    return fillObject(CreatedTrainingDiaryRdo, existTrainingDiary);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/:id')
  async getTrainingDiaryById(@Param('id')
id: string) {
    const trainingDiaryId = parseInt(id, 10);
    const existTrainingDiary = await this.trainingDiaryService.getTrainingDiaryById(trainingDiaryId);
    return fillObject(CreatedTrainingDiaryRdo, existTrainingDiary);
  }


  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const trainingDiaryId = parseInt(id, 10);
    this.trainingDiaryService.deleteTrainingDiary(trainingDiaryId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateTrainingDiaryDto, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const trainingDiaryId = parseInt(id, 10);
    const updatedTrainingDiary = await this.trainingDiaryService.updateTrainingDiary(trainingDiaryId, dto, userId)
    return fillObject(CreatedTrainingDiaryRdo, updatedTrainingDiary);
  }

}



