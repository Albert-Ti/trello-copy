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
import { FilesService } from './files.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types';

const swaggerUploadOptions = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

@ApiBearerAuth('access-token')
@ApiTags('Загрузка файлов')
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Загрузка картинки' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(swaggerUploadOptions)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.saveFile(req.user, file);
  }

  @ApiOperation({ summary: 'Удаление файла' })
  @Delete('delete/:id')
  async remove(@Req() req: RequestWithUser, @Param('id') id: number) {
    return await this.filesService.removeFile(req.user, id);
  }
}
