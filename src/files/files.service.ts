import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { AuthorizedUser } from 'src/types';
import { Repository } from 'typeorm';
import { FileEntity } from './entity/files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>,
  ) {}

  async saveFile(authorizedUser: AuthorizedUser, file: Express.Multer.File) {
    const uploadFolder = join(process.cwd(), 'uploads');

    try {
      await mkdir(uploadFolder, { recursive: true });
    } catch (mkdirError) {
      throw new InternalServerErrorException(
        'Ошибка при создании директории для файлов',
      );
    }

    const uniqueFilename = `${crypto.randomUUID()}-${file.originalname}`;

    try {
      await writeFile(join(uploadFolder, uniqueFilename), file.buffer);
    } catch (writeError) {
      throw new InternalServerErrorException('Ошибка при записи файла');
    }

    return await this.filesRepository.save({
      filename: uniqueFilename,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/${uniqueFilename}`,
      owner: authorizedUser,
    });
  }

  async removeFile(authorizedUser: AuthorizedUser, id: number) {
    const findFile = await this.filesRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!findFile) {
      throw new NotFoundException('Файл не найден');
    }

    if (authorizedUser.id !== findFile.owner.id) {
      throw new ForbiddenException('У вас нет доступа');
    }

    try {
      await rm(join(process.cwd(), findFile.path));
      return await this.filesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удаление файла');
    }
  }
}
