import { Module } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';

@Module({
  imports: [],
  controllers: [GymController],
  providers: [GymService, GymRepository],
  exports: [GymRepository]
})
export class GymModule {}
