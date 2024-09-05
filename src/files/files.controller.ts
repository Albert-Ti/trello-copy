import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { limit10mb, swaggerUploadOptions } from 'src/constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';
import { FilesService } from './files.service';

@ApiBearerAuth('access-token')
@ApiTags('Загрузка файлов')
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: 'Загрузка файла с возможной конвертацией изображения в WebP',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody(swaggerUploadOptions)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', limit10mb))
  async upload(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const convertedFile = await this.filesService.fileFilter(file);
    return await this.filesService.saveFile(req.user, convertedFile);
  }

  @ApiOperation({ summary: 'Удаление файла' })
  @Delete('delete/:id')
  async remove(@Req() req: RequestWithUser, @Param('id') id: number) {
    return await this.filesService.removeFile(req.user, id);
  }
}
