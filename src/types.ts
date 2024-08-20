import { Request } from 'express';
import { UserEntity } from './users/entity/users.entity';

export type RequestWithUser = Request & { user: Omit<UserEntity, 'password'> };
