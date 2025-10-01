import type { User } from '@packages/models/users/User';

export type LoginPayload = Pick<User, 'email' | 'password'>;
