import type { User } from '@packages/models/users/User';

export type RegisterPayload = Omit<User, 'id'>;
