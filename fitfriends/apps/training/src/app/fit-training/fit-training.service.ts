import { Training } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { FitTrainingEntity } from './fit-training.entity';
import { FitTrainingRepository } from './fit-training.repository';
import { TrainingQuery } from './query/training.query';
import { Express } from 'express';
import { Multer } from 'multer';
import * as fs from 'fs';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository
  ) {}

  async createTraining(dto: CreateFitTrainingDto, userId: string): Promise<Training> {


    const trainingEntity = new FitTrainingEntity({...dto, coachId: userId } );
    return this.fitTrainingRepository.create(trainingEntity);
  }

  async deleteTraining(id: number): Promise<void> {
    this.fitTrainingRepository.destroy(id);
  }



   async getTrainingById(id: number, ): Promise<Training> {
    const training = this.fitTrainingRepository.findById(id);
    return  training;
  }



  async getTrainings(query: TrainingQuery, userId: string): Promise<Training[]> {

    return this.fitTrainingRepository.find(query, userId);
  }

  async updateTraining(id: number, dto: CreateFitTrainingDto, userId: string): Promise<Training> {
    const existTraining = await this.getTrainingById(id);

    if (existTraining.coachId !== userId) {
      throw new ForbiddenException('Редактировать тренировку может только автор тренировки');
    }

    return this.fitTrainingRepository.update(id, new FitTrainingEntity(dto));
  }

    public async setBackgroundImage(trainingId: number, backgroundImage: string, userId: string) {
    const existTraining = await this.fitTrainingRepository.findById(trainingId);
    const prevBackgroundImage = existTraining.backgroundImage;

    if (fs.existsSync(prevBackgroundImage)) {
      fs.unlink(prevBackgroundImage, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }

    const updatedTrainingEntity = new FitTrainingEntity({...existTraining, backgroundImage});
    return this.updateTraining(trainingId, updatedTrainingEntity, userId );
  }




}
