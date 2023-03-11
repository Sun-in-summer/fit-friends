import { Module } from '@nestjs/common';
import { FitUserModule } from './fit-user/fit-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal:true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
      validate: validateEnvironments,
    }),
    FitUserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
