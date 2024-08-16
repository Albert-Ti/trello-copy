import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ColumnService } from 'src/column/column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ColumnService],
})
export class UsersModule {}
