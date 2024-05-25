/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/letsChat'), AuthModule, UsersModule, ChatModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
