import type { User } from '../models/user.model.js';
import type { UsersRepository } from '../repositories/users.repository.js';
import type { CreateUserPayload } from './payloads/create-user.payload.js';
import { withId } from '../../utils/with-id.js';

export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.findAll();
	}

	findById(id: string): Promise<User | undefined> {
		return this.usersRepository.findById(id);
	}

	findByEmail(email: string): Promise<User | undefined> {
		return this.usersRepository.findByEmail(email);
	}

	create(createUserPayload: CreateUserPayload): Promise<User> {
		return this.usersRepository.create(withId(createUserPayload));
	}
}
