import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { TrainingNotificationRepository } from './training-notification.repository';
import { TrainingNotificationService } from './training-notification.service';
import { TrainingNotificationController } from './training-notification.controller';
import { TrainingNotificationModel, TrainingNotificationSchema } from './training-notification.model';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingNotificationModel.name, schema: TrainingNotificationSchema }
    ]),
    MailModule,
    EmailSubscriberModule
  ],
  controllers: [
    TrainingNotificationController
  ],
  providers: [
    TrainingNotificationService,
    TrainingNotificationRepository
  ],
})
export class TrainingNotificationModule {}
