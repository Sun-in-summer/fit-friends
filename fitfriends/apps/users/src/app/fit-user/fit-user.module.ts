import { UserRole } from '@fitfriends/shared-types';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FitUserCoachModel, FitUserCoachSchema } from './fit-user-coach.model';
import { FitUserNewModel, FitUserNewSchema } from './fit-user-new.model';
import { FitUserTraineeModel, FitUserTraineeSchema } from './fit-user-trainee.model';
import { FitUserModel, FitUserSchema } from './fit-user.model';
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
