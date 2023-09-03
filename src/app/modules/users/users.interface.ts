import { User } from '@prisma/client';

export type UserResult = Omit<User, 'password'>;
