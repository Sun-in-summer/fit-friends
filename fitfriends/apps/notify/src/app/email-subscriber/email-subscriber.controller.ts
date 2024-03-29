import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent, FriendsRequestNotification } from '@fitfriends/shared-types';
import { Controller } from '@nestjs/common';
import { CreateSubscriberOfCoachDto } from './dto/create-subscriber-of-coach.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern( {cmd: CommandEvent.AddSubsriptionOnCoach})
  public async addSubscriberToCoach(subscriber: CreateSubscriberOfCoachDto ){
    return this.subscriberService.addSubscriberToCoach(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.AddFriend}) ////
  public async notifyFriend(notification: FriendsRequestNotification) {
    return this.subscriberService.notifyFriend(notification);
  }

  @EventPattern({ cmd: CommandEvent.BecameFriends}) ////
  public async notifyYouAreFriends(notification: FriendsRequestNotification) {
    return this.subscriberService.notifyYouAreFriends(notification);
  }
}
