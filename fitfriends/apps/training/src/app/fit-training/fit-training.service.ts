import { CommandEvent, Training } from '@fitfriends/shared-types';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { FitTrainingEntity } from './fit-training.entity';
import { FitTrainingRepository } from './fit-training.repository';
import { TrainingQuery } from './query/training.query';
import * as fs from 'fs';
import { FitTrainingExceptionMessage, RABBITMQ_SERVICE } from './fit-training.constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async createTraining(dto: CreateFitTrainingDto, userId: string): Promise<Training> {


    const trainingEntity = new FitTrainingEntity({...dto, coachId: userId } );

    const createdTraining = await this.fitTrainingRepository.create(trainingEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.AddTraining},
      {
        coachId: createdTraining.coachId,
        trainingTitle: createdTraining.title,
        trainingId: createdTraining.id,
      }
    );

    return createdTraining;
  }

  async deleteTraining(id: number): Promise<void> {
    this.fitTrainingRepository.destroy(id);
  }



   async getTrainingById(id: number, ): Promise<Training | null> {
    const training = this.fitTrainingRepository.findById(id);
    return  training;
  }



  async getTrainings(query: TrainingQuery, userId: string): Promise<Training[]> {

    return this.fitTrainingRepository.find(query, userId);
  }


   async getAllTrainings(query: TrainingQuery): Promise<Training[]> {

    return this.fitTrainingRepository.findAll(query);
  }

  async updateTraining(id: number, dto: CreateFitTrainingDto, userId: string): Promise<Training | null> {
    const existTraining = await this.getTrainingById(id);

    if (!existTraining) {
      throw new NotFoundException(FitTrainingExceptionMessage.NotFound);
    }

    if (existTraining.coachId !== userId) {
      throw new ForbiddenException(FitTrainingExceptionMessage.NotOwnFitTraining);
    }

    return this.fitTrainingRepository.update(id, new FitTrainingEntity(dto));
  }

    public async setFile(trainingId: number, field: string, file: string, userId: string) {
    const existTraining = await this.fitTrainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new NotFoundException(FitTrainingExceptionMessage.NotFound);
    }

    const prevFile = existTraining[field];

    if (fs.existsSync(prevFile)) {
      fs.unlink(prevFile, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }

    const updatedTrainingEntity = new FitTrainingEntity({...existTraining, [field]: file});
    return this.updateTraining(trainingId, updatedTrainingEntity, userId );
  }

}
