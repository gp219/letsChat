/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto); // Create new user document
    console.log(newUser);
    
    await newUser.save(); // Save to database
    return newUser; // Return created user
  }
  
  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }); // Find by username
  }

  // New function to search users by username (partial match)
  async searchUsers(username: string): Promise<UserDocument[]> {
    const regex = new RegExp(username, 'i'); // Case-insensitive search
    return await this.userModel.find({ username: { $regex: regex } });
  }

}
