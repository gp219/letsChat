/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { AuthGuard } from './auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    // Registration endpoint with DTO for data validation
    @Post('register')
    @HttpCode(HttpStatus.CREATED) // Indicate successful creation
    async register(@Body() createUserDto: CreateUserDto) {
      const user = await this.authService.register(createUserDto);
      // Optionally return a success message or limited user information
      return { message: 'Registration successful' , user: user };
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      
      return req.user;
    }
  }
  
