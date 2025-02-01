import type { User } from '../../../users/models/user.model.js';

export type LoginPayload = Pick<User, 'email' | 'password'>;
