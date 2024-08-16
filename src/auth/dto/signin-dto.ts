import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class SigninDto {
  @IsOptional()
  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'password не должен быть пустым' })
  password: string;
}
