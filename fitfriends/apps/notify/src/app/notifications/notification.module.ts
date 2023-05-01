import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { NotificationModel, NotificationSchema } from './notification.model';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationModel.name, schema: NotificationSchema }
    ]),
    MailModule
  ],
  controllers: [
    NotificationController
  ],
  providers: [
    NotificationService,
    NotificationRepository
  ],
  exports: [
    NotificationRepository
  ]
})
export class NotificationModule {}
