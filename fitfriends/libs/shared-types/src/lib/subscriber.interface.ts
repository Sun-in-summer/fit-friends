export interface Subscriber {
  id?: string;
  email: string;
  firstname: string;
  userId: string;
  isEmailVerified?: boolean;
  isReadyToGetNotifications?: boolean;
}
