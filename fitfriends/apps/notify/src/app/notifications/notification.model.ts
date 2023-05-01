import { Document } from 'mongoose';
import { Notification} from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const COLLECTION_NAME = 'notifications';

@Schema({
  collection: COLLECTION_NAME,
  timestamps: true,
})
export class NotificationModel extends Document implements  Notification {

  @Prop()
  public id?: string;

  @Prop()
  public userId: string;

  @Prop()
  public createdAt: Date;

  @Prop()
  public  text: string;

  @Prop()
  public  notifyAt?: Date;


}

export const NotificationSchema = SchemaFactory.createForClass(NotificationModel);
