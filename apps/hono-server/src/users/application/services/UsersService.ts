import type { Either } from '@packages/core/types/Either';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { User } from '@packages/models/users/User';
import type { ProfilesService } from '@profiles/application/services/ProfilesService';
import type { CreateUserPayload } from '@users/application/services/payloads/CreateUserPayload';
import type { UsersRepository } from '@users/infrastructure/repositories/UsersRepository';
import type { UuidService } from '@uuid/application/services/UuidService';

export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly profilesService: ProfilesService,
		private readonly uuidService: UuidService,
	) {}

	async findAll(): Promise<Either<User[], ApplicationError>> {
		const [users, error] = await this.usersRepository.findAll();
		if (error) {
			const applicationError = new ApplicationError('UsersService/findAll', '', error);
			return [null, applicationError];
		}

		return [users, null];
	}

	async findById(id: User['id']): Promise<Either<User | undefined, ApplicationError>> {
		const [user, error] = await this.usersRepository.findById(id);
		if (error) {
			const applicationError = new ApplicationError('UsersService/findById', '', error);
			return [null, applicationError];
		}

		return [user, null];
	}

	async findByEmail(email: User['email']): Promise<Either<User | undefined, ApplicationError>> {
		const [user, error] = await this.usersRepository.findByEmail(email);
		if (error) {
			const applicationError = new ApplicationError('UsersService/findByEmail', '', error);
			return [null, applicationError];
		}

		return [user, null];
	}

	async create(createUserPayload: CreateUserPayload): Promise<Either<User, ApplicationError>> {
		const [uuid, generateUuidError] = this.uuidService.generate();
		if (generateUuidError) {
			const applicationError = new ApplicationError(
				'UsersService/create',
				'',
				generateUuidError,
			);
			return [null, applicationError];
		}

		const [user, createUserError] = await this.usersRepository.create({
			...createUserPayload,
			id: uuid,
		});
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
