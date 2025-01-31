import type { User } from '../models/user.model.js';
import type { CreateUserData } from './types/create-user-data.type.js';

export interface UsersRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(createUserData: CreateUserData): Promise<User>;
}
