import { Module } from '@nestjs/common';
import { FitUserController } from './fit-user.controller';
import { FitUserService } from './fit-user.service';

@Module({
  controllers: [FitUserController],
  providers: [FitUserService],
})
export class FitUserModule {}
