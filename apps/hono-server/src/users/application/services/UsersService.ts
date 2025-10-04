import type { User } from '@packages/models/users/User';
import type { ProfilesService } from '@profiles/application/services/ProfilesService';
import type { CreateUserPayload } from '@users/application/services/payloads/CreateUserPayload';
import type { UsersRepository } from '@users/infrastructure/repositories/UsersRepository';
import { withId } from '@utils/mixins/withId';

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
