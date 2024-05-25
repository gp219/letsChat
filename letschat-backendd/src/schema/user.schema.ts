/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.Document & User;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // Hashed password
}

export const UserSchema = SchemaFactory.createForClass(User);
