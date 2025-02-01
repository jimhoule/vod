import type { User } from '../../../users/models/user.model.js';

export type RegisterPayload = Omit<User, 'id'>;
