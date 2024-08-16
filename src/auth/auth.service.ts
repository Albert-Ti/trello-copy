import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      return await this.usersService.create(dto);
    } catch (error) {
      throw new UnauthorizedException('Пользователь уже зарегистрирован');
    }
  }

  async signin(user: Omit<User, 'password'>) {
    return {
      token: this.jwtService.sign(
        { sub: user.id },
        { secret: process.env.JWT_SECRET },
      ),
    };
  }

  async validateUser({ email, password }) {
    const user = await this.usersService.getOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
