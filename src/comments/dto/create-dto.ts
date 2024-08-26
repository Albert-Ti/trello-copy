import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentsDto {
  @ApiProperty({ example: 'Задачу выполнил', description: 'Комментарий' })
  @IsString({ message: 'text должен быть строкой' })
  text: string;

  @ApiProperty({ example: 1, description: 'id родительского комментария' })
  @IsOptional()
  @IsNumber({}, { message: 'parentId должен быть числом' })
  parentId?: number;
}
