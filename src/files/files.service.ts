import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mkdir, writeFile } from 'fs/promises';
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

    /* await this.filesRepository.save({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/${file.originalname}`,
      owner: authorizedUser,
    }); */

    return {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/${uniqueFilename}`,
      owner: authorizedUser,
    };
  }
}
