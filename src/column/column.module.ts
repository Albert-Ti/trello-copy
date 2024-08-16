import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnService {}
