import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FitUserNewModel, FitUserNewSchema } from './fit-user-new.model';
import { FitUserRepository } from './fit-user.repository';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: FitUserNewModel.name,
      schema: FitUserNewSchema,

    }
  ])],
  providers: [FitUserRepository],
  exports: [FitUserRepository]
})
export class FitUserModule {}
