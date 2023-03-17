export interface Notification {
  id?: string;
  createdAt: Date;
  userId: string;
  text: string;
  notifyAt?: Date;
}
