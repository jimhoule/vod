import type { User } from '@packages/models/users/User';

export type CreateUserPayload = Omit<User, 'id'>;
