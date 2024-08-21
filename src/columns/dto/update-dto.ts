import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdateColumnsDto {
  @ApiProperty({ example: 'Колонка Задач', description: 'Заголовок ' })
  @Length(5, 30, {
    message: 'title должен быть строкой и содержать от 5 до 30 символов',
  })
  title: string;
}
