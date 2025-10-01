import type { User } from '../../models/user.model';

export type CreateUserPayload = Omit<User, 'id'>;
