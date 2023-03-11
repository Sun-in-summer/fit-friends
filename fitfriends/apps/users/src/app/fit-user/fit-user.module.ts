import { Module } from '@nestjs/common';
import { FitUserMemoryRepository } from './fit-user-memory.repository';
// import { FitUserController } from './fit-user.controller';
// import { FitUserService } from './fit-user.service';

@Module({
  // controllers: [FitUserController],
  providers: [FitUserMemoryRepository],
  exports: [FitUserMemoryRepository]
})
export class FitUserModule {}
