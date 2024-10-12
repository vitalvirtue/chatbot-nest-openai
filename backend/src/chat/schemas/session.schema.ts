import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Otomatik createdAt ve updatedAt
export class Session extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  })
  messages: { type: string; text: string }[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
