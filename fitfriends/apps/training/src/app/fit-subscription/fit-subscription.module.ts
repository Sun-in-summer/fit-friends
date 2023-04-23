import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FitSubscriptionController } from './fit-subscription.controller';
import { FitSubscriptionService } from './fit-subscription.service';
import { FitSubscriptionRepository } from './fit-subscription.repository';


@Module({
  controllers: [FitSubscriptionController],
  providers: [FitSubscriptionService, FitSubscriptionRepository, JwtAuthGuard],
  exports: [FitSubscriptionRepository]
})
export class FitSubscriptionModule {}
