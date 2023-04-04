import { Injectable } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { Gym } from '@fitfriends/shared-types';
import { GymEntity } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';
import fs, { readdir } from 'fs';
import path from 'path';


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

  async getGyms(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async updateGym(id: number, dto: CreateGymDto): Promise<Gym> {
    return this.gymRepository.update(id, new GymEntity(dto));
  }

  public async setFiles(gymId: number,  files: string[]) {
    console.log('service');
    const existGym = await this.gymRepository.findById(gymId);
    const prevFiles = existGym.photos;

    prevFiles.forEach((prevFile) => {
        if (fs.existsSync(prevFile)) {
          fs.unlink(prevFile, (err) => {
            if (err) {
            console.error(err);
            return err;
            }
          });
        }
    })


    const updatedGymEntity = new GymEntity({...existGym, photos: files});
    return this.updateGym(gymId, updatedGymEntity );
  }
}
