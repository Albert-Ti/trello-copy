import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @Post('signin')
  signin() {}
}
