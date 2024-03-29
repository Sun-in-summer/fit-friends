import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';
import { FriendsRequestNotification } from '@fitfriends/shared-types';
import { CreateSubscriberOfCoachDto } from './dto/create-subscriber-of-coach.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }



   public async addSubscriberToCoach(subscriberOfCoach: CreateSubscriberOfCoachDto) {
     const {coachId, userId, userEmail} = subscriberOfCoach;
     const existsCoach = await this.emailSubscriberRepository.findById(coachId);
     if (!existsCoach) {
      throw new NotFoundException();
    }
    const coachSubscribers = existsCoach.subscribers;
    const isUserSigned = coachSubscribers.find((item) => item.userId === userId);
    if (!isUserSigned) {
      coachSubscribers.push({userId, email: userEmail });
    }

    const updatedCoachEntity = new EmailSubscriberEntity({...existsCoach, subscribers: coachSubscribers});
    return await this.emailSubscriberRepository.update(coachId, updatedCoachEntity);
  }


   public async notifyFriend(notification: FriendsRequestNotification) {
    const { adresseeEmail } = notification;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(adresseeEmail);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    return this.mailService.sendNotifyFriendshipRequest(notification);
  }



   public async notifyYouAreFriends(notification: FriendsRequestNotification) {
    const { adresseeEmail } = notification;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(adresseeEmail);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    return this.mailService.sendNotifyBecameFriends(notification);
  }
}
