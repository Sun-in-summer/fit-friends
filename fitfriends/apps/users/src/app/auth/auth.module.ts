import { Module } from '@nestjs/common';
import { FitUserModule } from '../fit-user/fit-user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [FitUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
