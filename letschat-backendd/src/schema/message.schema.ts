/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from './user.schema'; // Import User schema

@Schema()
export class Message {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sender: User; // Reference to sender user document

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  recipient: User; // Reference to recipient user document

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date; // Message timestamp
}

export type MessageDocument = Message & mongoose.Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
