import { Request } from 'express';
import { UserEntity } from './users/entity/users.entity';

export type AuthorizedUser = Omit<UserEntity, 'password'>;

export type RequestWithUser = Request & { user: AuthorizedUser };
