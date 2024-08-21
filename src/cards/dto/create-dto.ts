import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCardsDto {
  @ApiProperty({ example: 'Карточка', description: 'Заголовок' })
  @Length(5, 30, {
    message: 'title должен быть строкой и содержать от 5 до 30 символов',
  })
  title: string;

  @ApiProperty({ example: 'Задача по этой карточки', description: 'Описание' })
  @IsString({ message: 'description должно быть строкой' })
  description: string;
}
