import type { User } from '../user.model.js';

export interface UsersRepository {
	create(user: User): Promise<User>;
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
}
