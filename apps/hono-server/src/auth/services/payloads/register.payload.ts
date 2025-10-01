import type { User } from '../../../users/models/user.model';

export type RegisterPayload = Omit<User, 'id'>;
