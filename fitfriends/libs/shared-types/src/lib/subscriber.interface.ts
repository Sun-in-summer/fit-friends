import { SubscriberOfCoach } from './subscriber-of-coach.interface';

export interface Subscriber {
  id?: string;
  email: string;
  firstname: string;
  userId: string;
  isEmailVerified?: boolean;
  isReadyToGetNotifications?: boolean;
  subscribers?: SubscriberOfCoach[]
}
