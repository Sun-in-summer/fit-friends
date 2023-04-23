import { Module } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TraineeRoleStrategy } from '../strategies/trainee-role.strategy';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceService } from './user-balance.service';
import { UserBalanceRepository } from './user-balance.repository';

@Module({
  imports: [],
  controllers: [UserBalanceController],
  providers: [
    UserBalanceService,
    UserBalanceRepository,
    JwtStrategy,
    TraineeRoleStrategy],
  exports: [UserBalanceRepository]
})
export class UserBalanceModule {}
