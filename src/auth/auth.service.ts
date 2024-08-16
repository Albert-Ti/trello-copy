import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(dto: SignupDto) {
    try {
      return await this.usersService.create(dto);
    } catch (error) {
      throw new UnauthorizedException('Пользователь уже зарегистрирован');
    }
  }

  signin() {}
}
