import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  

  @Post(`login`)
  @ApiOperation({summary: 'Log into system, creates authorization token'})
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  @ApiResponse({status: 201, description: 'OK'})
  @ApiResponse({status: 401, description: 'User doesnt exist, or wrong password/username'})
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    console.log(`login ${req.body.username}`);
    const token = this.authService.login(req.user);
    return token;
    // return this.authService.validateUser(req.body.username, req.body.password);
  }
}
