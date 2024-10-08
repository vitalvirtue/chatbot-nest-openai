import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
