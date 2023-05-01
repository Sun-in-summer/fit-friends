import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@fitfriends/shared-types';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTrainingNotificationDto } from './dto/create-training-notification.dto';
import { TrainingNotificationService } from './training-notification.service';

@Controller('training-notification')
export class TrainingNotificationController {
  constructor(
    private readonly trainingNotificationService: TrainingNotificationService,
  ) {}

  @EventPattern( {cmd: CommandEvent.AddTraining})
  public async addNotificationAboutTraining(newTraining: CreateTrainingNotificationDto ){
    return this.trainingNotificationService.addNotificationAboutTraining(newTraining);
  }



  @Post('send-notification')
  @HttpCode(HttpStatus.OK)
  public async sendNewTrainingsNotification () {
      const newTrainings = await this.trainingNotificationService.sendNotifications();
      return newTrainings;
  }
}
