import type { User } from '../models/user.model';
import type { UsersRepository } from './users.repository';
import type { CreateUserData } from './types/create-user-data.type';

export class FakeUsersRepository implements UsersRepository {
	private users: User[] = [];

	async findAll(): Promise<User[]> {
		return this.users;
	}

	async findById(id: User['id']): Promise<User | undefined> {
		return this.users.find((user: User): boolean => user.id === id);
	}

	async findByEmail(email: User['email']): Promise<User | undefined> {
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
