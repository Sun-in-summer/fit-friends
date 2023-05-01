import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateTrainingNotificationDto } from './dto/create-training-notification.dto';
import { TrainingNotificationRepository } from './training-notification.repository';
import { TrainingNotificationEntity } from './training-notification.entity';
import { TRAINING_EXISTS } from './training-notification.constant';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';


@Injectable()
export class TrainingNotificationService {
  constructor(
    private readonly trainingNotificationRepository: TrainingNotificationRepository,
    private readonly emailSubscribersRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) {}


  public async addNotificationAboutTraining(newTraining: CreateTrainingNotificationDto) {
    const  { trainingId} = newTraining;

    const existsTraining = await this.trainingNotificationRepository.findByTrainingId(trainingId);

    if (existsTraining) {
      throw new Error(TRAINING_EXISTS);
    }

    return this.trainingNotificationRepository
      .create(new TrainingNotificationEntity(newTraining));
  }


  public async sendNotifications(){
    const currentNotifications = await this.trainingNotificationRepository.find();


     currentNotifications.forEach(async (notification) =>  {
      const coachId = notification.coachId;
      const coachName = notification.coachName;
      const coach = await this.emailSubscribersRepository.findById(coachId);

      const subscribersOfCoach = coach.subscribers;
      const trainingTitle = notification.trainingTitle;

      subscribersOfCoach.forEach((subscriber) => this.mailService.sendNotifyNewTraining(subscriber, trainingTitle, coachName));

      await this.trainingNotificationRepository.destroy(notification.id);

     })

     return this.trainingNotificationRepository.find();
  }
}
