/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { getNewTrainingsRabbitMqConfig, getPersonalTrainingsRabbitMqConfig,  } from './app/config/rabbitmq.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('The «Training» service')
    .setDescription('Trainings service API')
    .setVersion('1.0')
    .build();

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getNewTrainingsRabbitMqConfig(configService));
  app.connectMicroservice(getPersonalTrainingsRabbitMqConfig(configService));

  await app.startAllMicroservices();
  Logger.log(`🚀 Training service is running on`);


  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();



