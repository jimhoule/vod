import type { User } from '@packages/models/users/User';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';

export interface UsersRepository {
	findAll(): Promise<User[]>;
	findById(id: User['id']): Promise<User | undefined>;
	findByEmail(email: User['email']): Promise<User | undefined>;
	create(createUserData: CreateUserData): Promise<User>;
}
