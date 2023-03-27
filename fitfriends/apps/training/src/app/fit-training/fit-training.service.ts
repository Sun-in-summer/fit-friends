import { Training } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { FitTrainingEntity } from './fit-training.entity';
import { FitTrainingRepository } from './fit-training.repository';
import { TrainingQuery } from './query/training.query';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository
  ) {}

  async createTraining(dto: CreateFitTrainingDto, userId: string): Promise<Training> {

    const trainingEntity = new FitTrainingEntity({...dto, coachId: userId });
    return this.fitTrainingRepository.create(trainingEntity);
  }

  async deleteTraining(id: number): Promise<void> {
    this.fitTrainingRepository.destroy(id);
  }

  async getTraining(id: number): Promise<Training> {
    return this.fitTrainingRepository.findById(id);
  }

  async getTrainings(query: TrainingQuery): Promise<Training[]> {
    return this.fitTrainingRepository.find(query);
  }

  async updateTraining(id: number, dto: CreateFitTrainingDto): Promise<Training> {
    return this.fitTrainingRepository.update(id, new FitTrainingEntity(dto));
  }
}
