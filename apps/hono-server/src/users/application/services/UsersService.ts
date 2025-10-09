import type { AsyncResult } from '@packages/core/async';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
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

	async findAll(): Promise<AsyncResult<User[], ApplicationError>> {
		const [users, error] = await this.usersRepository.findAll();
		if (error) {
			const applicationError = new ApplicationError('UsersService/findAll', '', error);
			return [null, applicationError];
		}

		return [users, null];
	}

	async findById(id: User['id']): Promise<AsyncResult<User | undefined, ApplicationError>> {
		const [user, error] = await this.usersRepository.findById(id);
		if (error) {
			const applicationError = new ApplicationError('UsersService/findById', '', error);
			return [null, applicationError];
		}

		return [user, null];
	}

	async findByEmail(
		email: User['email'],
	): Promise<AsyncResult<User | undefined, ApplicationError>> {
		const [user, error] = await this.usersRepository.findByEmail(email);
		if (error) {
			const applicationError = new ApplicationError('UsersService/findByEmail', '', error);
			return [null, applicationError];
		}

		return [user, null];
	}

	async create(
		createUserPayload: CreateUserPayload,
	): Promise<AsyncResult<User, ApplicationError>> {
		const [user, createUserError] = await this.usersRepository.create(
			withId(createUserPayload),
		);
		if (createUserError) {
			const applicationError = new ApplicationError(
				'UsersService/create',
				'',
				createUserError,
			);
			return [null, applicationError];
		}

		const [, createProfileError] = await this.profilesService.create({
			name: user.firstName,
			userId: user.id,
		});
		if (createProfileError) {
			const applicationError = new ApplicationError(
				'UsersService/create',
				'',
				createProfileError,
			);
			return [null, applicationError];
		}

		return [user, null];
	}
}
