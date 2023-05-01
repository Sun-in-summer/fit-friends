import { Document } from 'mongoose';
import { TrainingNotification } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const COLLECTION_NAME = 'training-notifications';

@Schema({
  collection: COLLECTION_NAME,
  timestamps: true,
})
export class TrainingNotificationModel extends Document implements  TrainingNotification {
  @Prop()
  public coachName: string;

  @Prop()
  public trainingId: number;

  @Prop()
  public coachId: string;

  @Prop()
  public trainingTitle: string;

  @Prop()
  public lastNotification: Date;

}

export const TrainingNotificationSchema = SchemaFactory.createForClass(TrainingNotificationModel);
