import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { FriendsRequestNotification, Subscriber } from '@fitfriends/shared-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_FRIENDSHIP_REQUEST  } from './mail.constant';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`,
      }
    })
  }


  public async sendNotifyFriendshipRequest(notification: FriendsRequestNotification) {
    await this.mailerService.sendMail({
      to: notification.adresseeEmail,
      subject: EMAIL_FRIENDSHIP_REQUEST ,
      template: './add-friend-request',
      context: {
        user: `${notification.adresseeName}`,
        friend: `${notification.senderName}`
      }
    })
  }


   public async sendNotifyBecameFriends(notification: FriendsRequestNotification) {
    await this.mailerService.sendMail({
      to: notification.adresseeEmail,
      subject: EMAIL_FRIENDSHIP_REQUEST ,
      template: './became-friends',
      context: {
        user: `${notification.adresseeName}`,
        friend: `${notification.senderName}`
      }
    })
  }
}
