import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ClientsModule } from '@nestjs/microservices';
import { getPersonalTrainingsRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ_SERVICE} from './personal-training-order.constant';
import { PersonalTrainingOrderRepository } from './personal-training-order.perository';
import { PersonalTrainingOrderService } from './personal-training-order.service';
import { PersonalTrainingOrderController } from './personal-training-order.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getPersonalTrainingsRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [PersonalTrainingOrderController],
  providers: [
    PersonalTrainingOrderService,
    PersonalTrainingOrderRepository,
    JwtAuthGuard],
  exports: [PersonalTrainingOrderRepository]
})
export class PersonalTrainingOrderModule {}
