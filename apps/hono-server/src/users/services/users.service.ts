import type { User } from '../models/user.model';
import type { UsersRepository } from '../repositories/users.repository';
import type { CreateUserPayload } from './payloads/create-user.payload';
import type { ProfilesService } from '../../profiles/services/profiles.service';
import { withId } from '../../utils/with-id';

export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly profilesService: ProfilesService,
	) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.findAll();
	}

	findById(id: User['id']): Promise<User | undefined> {
		return this.usersRepository.findById(id);
	}

	findByEmail(email: User['email']): Promise<User | undefined> {
		return this.usersRepository.findByEmail(email);
	}

	async create(createUserPayload: CreateUserPayload): Promise<User> {
		const user = await this.usersRepository.create(withId(createUserPayload));
		await this.profilesService.create({
			name: user.firstName,
			userId: user.id,
		});

		return user;
	}
}
