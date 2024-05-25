/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schema/message.schema';
import { UserDocument } from '../schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: mongoose.Model<MessageDocument>
  ) {}

  async createMessage(sender: UserDocument["username"], recipient: UserDocument["username"], content: string): Promise<Message> {
    const newMessage = new this.messageModel({ sender, recipient, content });
    return await newMessage.save();
  }

  // ... additional methods for finding messages, etc. (to be implemented later)
}
