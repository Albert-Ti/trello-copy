import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentsDto {
  @IsOptional()
  @IsString({ message: 'text должен быть строкой' })
  text: string;
}
