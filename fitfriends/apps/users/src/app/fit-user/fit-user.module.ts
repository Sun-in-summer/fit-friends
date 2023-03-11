import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FitUserModel, FitUserSchema } from './fit-user.model';
import { FitUserRepository } from './fit-user.repository';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: FitUserModel.name,
      schema: FitUserSchema
    }
  ])],
  providers: [FitUserRepository],
  exports: [FitUserRepository]
})
export class FitUserModule {}
