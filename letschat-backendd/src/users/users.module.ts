/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
