import { Module } from '@nestjs/common';
import { FitUserModule } from './fit-user/fit-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FitUserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
