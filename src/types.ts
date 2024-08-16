import { Request } from 'express';
import { User } from './users/entity/users.entity';

export type RequestWithUser = Request & { user: User };
