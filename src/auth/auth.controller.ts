import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup-dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.authService.signin(user);
  }
}
