import type { User } from '../../models/user.model.js';

export type CreateUserPayload = Omit<User, 'id'>;
