import type { User } from '../models/user.model.js';
import type { CreateUserData } from './types/create-user-data.type.js';

export interface UsersRepository {
	findAll(): Promise<User[]>;
	findById(id: User['id']): Promise<User | undefined>;
	findByEmail(email: User['email']): Promise<User | undefined>;
	create(createUserData: CreateUserData): Promise<User>;
}
