import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @IsNotEmpty({ message: 'password не должен быть пустым' })
  password: string;
}
