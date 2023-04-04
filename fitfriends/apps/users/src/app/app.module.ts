import { Module } from '@nestjs/common';
import { FitUserModule } from './fit-user/fit-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { getMongoDbConfig } from '../config/mongodb.config';
import {jwtOptions} from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal:true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    FitUserModule,
    AuthModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
