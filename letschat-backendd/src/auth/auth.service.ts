/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto'; // Import DTO
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    // Hash password securely before saving user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Adjust salt rounds as needed
    const newUser = await this.usersService.create({
      ...createUserDto, // Destructure and spread other properties
      password: hashedPassword,
    });
    console.log("newUser :", newUser);
    
    // Generate JWT token with user ID and username
    const payload = { username: newUser.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Compare hashed password with provided password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async getUserFromToken(token: string): Promise<any | undefined> {
    try {
      // Replace with your secret key used for token signing
      const secretOrPrivateKey = jwtConstants.secret;

      // Verify and decode the token using jsonwebtoken
      const decodedToken = jwt.verify(token, secretOrPrivateKey);

      // Assuming 'username' is the property used for user retrieval
      const username = (decodedToken as jwt.JwtPayload).username;

      // Find the user by username using UsersService (assuming you have one)
      const user = await this.usersService.findOne(username);
      console.log("user : ",user);
      
      // Return the user object (or relevant user information)
      return user;
    } catch (error) {
      // Handle JWT verification errors (e.g., invalid token, expired token)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  
}

