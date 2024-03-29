import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { getMongoDbConfig, mongoDbOptions } from './config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvironments } from './env.validation';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { mailOptions } from 'apps/notify/src/app/config/mail.config';
import { TrainingNotificationModule } from './training-notifications/training-notification.module';
import {jwtOptions } from 'apps/notify/src/app/config/jwt.config';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions, jwtOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    TrainingNotificationModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
