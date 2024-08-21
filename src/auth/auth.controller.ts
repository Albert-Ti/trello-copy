import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-dto';
import { SignupDto } from './dto/signup-dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    return await this.authService.signin(dto);
  }

  @ApiOperation({ summary: 'Запрос на сброс пароля' })
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return email;
  }
}
