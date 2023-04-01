import { Injectable } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { Gym } from '@fitfriends/shared-types';
import { GymEntity } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';


@Injectable()
export class GymService {
  constructor(
    private readonly gymRepository: GymRepository
  ) {}

  async createGym(dto: CreateGymDto): Promise<Gym> {
    const gymEntity = new GymEntity(dto);
    return this.gymRepository.create(gymEntity);
  }

  async deleteGym(id: number): Promise<void> {
    this.gymRepository.destroy(id);
  }

  async getGym(id: number): Promise<Gym> {
    return this.gymRepository.findById(id);
  }

  async getCategories(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async updateCategory(id: number, dto: CreateGymDto): Promise<Gym> {
    return this.gymRepository.update(id, new GymEntity(dto));
  }
}
