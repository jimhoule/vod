import type { User } from './user.model.js';
import type { UsersRepository } from './repositories/users.repository.js';
import { withId } from '../utils/with-id.js';

export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async create(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	): Promise<User> {
		const user: User = withId({
			firstName,
			lastName,
			email,
			password,
		});

		return this.usersRepository.create(user);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.findAll();
	}

	findById(id: string): Promise<User | undefined> {
		return this.usersRepository.findById(id);
	}

	findByEmail(email: string): Promise<User | undefined> {
		return this.usersRepository.findByEmail(email);
	}
}
