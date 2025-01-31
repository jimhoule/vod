import type { User } from '../models/user.model.js';
import type { UsersRepository } from './users.repository.js';
import type { CreateUserData } from './types/create-user-data.type.js';

export class FakeUsersRepository implements UsersRepository {
	private users: User[] = [];

	async findById(id: string): Promise<User | undefined> {
		return this.users.find((user: User): boolean => user.id === id);
	}

	async findAll(): Promise<User[]> {
		return this.users;
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this.users.find((user: User): boolean => user.email === email);
	}

	async create(createUserData: CreateUserData): Promise<User> {
		const doesAlreadyExist = await this.findByEmail(createUserData.email);
		if (doesAlreadyExist) {
			throw new Error(`User with email ${createUserData.email} already exists`);
		}

		const user = createUserData;

		// NOTE: Creates a copy with a new reference
		this.users.push(JSON.parse(JSON.stringify(user)));

		return user;
	}
}
