import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ColumnService } from 'src/column/column.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ColumnService],
})
export class UsersModule {}
