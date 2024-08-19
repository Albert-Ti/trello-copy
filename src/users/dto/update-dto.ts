import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'username должен быть строкой' })
  username: string;

  @IsOptional()
  @IsEmail({}, { message: 'Некорректно введен email' })
  email: string;

  @IsOptional()
  password: string;
}
