import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin-dto';
import { SignupDto } from './dto/signup-dto';
import { AppErrors } from 'src/errors';

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
      throw new UnauthorizedException(AppErrors.USER.IS_ALREADY_EXISTS);
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.validateUser({
      email: dto.email,
      password: dto.password,
    });
    if (!user) {
      throw new UnauthorizedException(
        AppErrors.USER.INCORRECT_LOGIN_OR_PASSWORD,
      );
    }
    return {
      token: this.jwtService.sign(user, { secret: process.env.JWT_SECRET }),
    };
  }

  async validateUser({ email, password }) {
    const user = await this.usersService.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
