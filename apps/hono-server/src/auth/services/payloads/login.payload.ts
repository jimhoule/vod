import type { User } from '../../../users/models/user.model';

export type LoginPayload = Pick<User, 'email' | 'password'>;
