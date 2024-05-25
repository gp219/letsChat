/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schema/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
      ],
      providers: [ChatService],
      controllers: [],
      exports: [ChatService],
})
export class ChatModule {}
