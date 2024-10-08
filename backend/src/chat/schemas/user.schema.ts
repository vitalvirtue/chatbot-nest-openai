import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  sessionStart: Date;

  @Prop()
  sessionEnd?: Date;

  @Prop({ default: 0 })
  questionsAnswered: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
