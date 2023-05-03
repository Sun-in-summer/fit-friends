import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './notification.entity';
import { Notification } from '@fitfriends/shared-types';


@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async addNotification(notification: CreateNotificationDto) {


    return this.notificationRepository
      .create(new NotificationEntity(notification));
  }


  public async deleteNotification(id: string): Promise<void> {
    return this.notificationRepository.destroy(id);
  }

  public async getNotificationsByUserId( userId: string): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }
}
