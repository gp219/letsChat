/* eslint-disable prettier/prettier */
import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { ChatService } from '../chat/chat.service'; // Assuming 'ChatService' is the correct name
import { AuthService } from '../auth/auth.service';
import { RedisService } from 'src/common/redis/redis.service';
import { createServer } from 'http';

@Injectable()
@WebSocketGateway({ namespace: 'chat' }) // Define a namespace for the chat
export class ChatGateway {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatService: ChatService, // Assuming 'ChatService' is the correct name
    private readonly authService: AuthService,
    private readonly redisService: RedisService
  ) {}

  // Reference to the Socket.IO server instance
  httpServer = createServer();
  @WebSocketServer() server = new Server(this.httpServer, {
    cors: {
      origin: "http://localhost:3000",
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true
    }
  });

  async handleConnect(socket: Socket) {
    // 1. Retrieve user information from the token (using AuthService)
    const user = await this.authService.getUserFromToken(socket.handshake.auth.token);
    console.log("user : ",user);
    
    // 2. Check if user is valid and authorized
    if (!user) {
      throw new WsException('Invalid or missing authentication token');
    }

    // 3. Store connected user information (using Redis)
    const userId = user._id.toString();
    await this.redisService.set(`user:${userId}`, socket.id);

    // 4. Emit a 'userConnected' event to other connected users (optional)
    this.server.emit('userConnected', user);
  }

  async handleDisconnect(socket: Socket) {
    
    const user = await this.authService.getUserFromToken(socket.handshake.auth.token);
    console.log("user : ",user);
    // 1. Remove user from connected users list (using Redis)
    const userId = user._id.toString();
    if (!userId) {
      return; // Handle case where user ID cannot be retrieved
    }
    await this.redisService.del(`user:${userId}`);

    // 2. Emit a 'userDisconnected' event to other connected users (optional)
    this.server.emit('userDisconnected', userId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(socket: Socket, payload: { recipientUsername: string; content: string }) {
    // 1. Get the sender user from the token (already retrieved in handleConnect)
    // No need to use connectedUsers here as user info is assumed to be available

    // 2. Find the recipient user by username using UserService
    const recipient = await this.usersService.findOne(payload.recipientUsername);

    // 3. Validate recipient existence and authorization
    if (!recipient) {
      // Handle recipient not found error
      return;
    }
    const sender = await this.authService.getUserFromToken(socket.handshake.auth.token);
    // 4. Create and save the message using MessageService
    const message = await this.chatService.createMessage(sender, recipient.username, payload.content); // Assuming 'user' is available

    // 5. Emit the message to the recipient user's connected socket(s) (using Redis)
    const recipientSocketId = await this.redisService.get(`user:${recipient.username.toString()}`);
    if (recipientSocketId) {
      const recipientSocket = this.server.sockets.sockets[recipientSocketId];
      if (recipientSocket) {
        recipientSocket.emit('receiveMessage', message);
      }
    } else {
      // Handle case where recipient is not online (optional: store message for later delivery)
      console.log('Recipient is not online. Store message for later delivery.');
    }
  }
}


