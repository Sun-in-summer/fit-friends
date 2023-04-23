import { TrainingDiary } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { TrainingDiaryRepository } from './training-diary.repository';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { TrainingDiaryEntity } from './training-diary.entity';
import { TrainingDiaryQuery } from './query/training-diary.query';


@Injectable()
export class TrainingDiaryService {
  constructor(
    private readonly trainingDiaryRepository: TrainingDiaryRepository
  ) {}

  async createTrainingDiary(dto: CreateTrainingDiaryDto, userId: string): Promise<TrainingDiary> {


    const trainingDiaryEntity = new TrainingDiaryEntity({...dto, userId: userId } );
    return this.trainingDiaryRepository.create(trainingDiaryEntity);
  }

  async deleteTrainingDiary(id: number): Promise<void> {
    this.trainingDiaryRepository.destroy(id);
  }



   async getTrainingDiaryById(id: number, ): Promise<TrainingDiary> {
    const trainingDiary = this.trainingDiaryRepository.findById(id);
    return  trainingDiary;
  }



  async getTrainingDiariesByUserId(userId: string, query?: TrainingDiaryQuery): Promise<TrainingDiary[]> {
    return this.trainingDiaryRepository.find(userId, query);
  }

  async updateTrainingDiary(id: number, dto: CreateTrainingDiaryDto, userId: string): Promise<TrainingDiary> {
    const existTrainingDiary= await this.getTrainingDiaryById(id);

    if (existTrainingDiary.userId !== userId) {
      throw new ForbiddenException('Редактировать дневник тренировки может только его автор');
    }

    return this.trainingDiaryRepository.update(id, new TrainingDiaryEntity(dto));
  }

}
