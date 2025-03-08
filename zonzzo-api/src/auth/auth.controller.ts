import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.body;
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }
}
