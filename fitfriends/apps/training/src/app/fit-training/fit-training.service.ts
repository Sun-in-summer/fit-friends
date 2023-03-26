import { Training } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { FitTrainingEntity } from './fit-training.entity';
import { FitTrainingRepository } from './fit-training.repository';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository
  ) {}

  async createTraining(dto: CreateFitTrainingDto): Promise<Training> {
    const trainingEntity = new FitTrainingEntity(dto);
    return this.fitTrainingRepository.create(trainingEntity);
  }

  async deleteTraining(id: number): Promise<void> {
    this.fitTrainingRepository.destroy(id);
  }

  async getTraining(id: number): Promise<Training> {
    return this.fitTrainingRepository.findById(id);
  }

  async getTrainings(): Promise<Training[]> {
    return this.fitTrainingRepository.find();
  }

  // async updateTraining(id: number, dto: UpdateFitTrainingDto): Promise<Training> {
  //   return this.fitTrainingRepository.update(id, new FitTrainingEntity(dto));
  // }
}
