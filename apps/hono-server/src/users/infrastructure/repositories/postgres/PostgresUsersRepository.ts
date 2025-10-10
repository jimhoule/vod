import { async } from '@packages/core/async';
import type { Either } from '@packages/core/types/Either';
import type { PostgresError } from '@packages/db/postgres';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { PostgresRepositoryInfrastructureErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryInfrastructureErrorMapper';
import type { User } from '@packages/models/users/User';
import type { UsersRepository } from '@users/infrastructure/repositories/UsersRepository';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';
import {
	findAllUsers,
	findUserById,
	findUserByEmail,
	createUser,
} from '@users/infrastructure/repositories/postgres/queries';

export class PostgresUsersRepository implements UsersRepository {
	constructor(
		private readonly postgresRepositoryInfrastructureErrorMapper: PostgresRepositoryInfrastructureErrorMapper,
	) {}

	async findAll(): Promise<Either<User[], InfrastructureError>> {
		const [users, error] = await async(findAllUsers());
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresUsersRepository/findAll',
				);
			return [null, infrastructureError];
		}

		return [users, null];
	}

	async findById(id: User['id']): Promise<Either<User | undefined, InfrastructureError>> {
		const [user, error] = await async(findUserById(id));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresUsersRepository/findById',
				);
			return [null, infrastructureError];
		}

		return [user, null];
	}

	async findByEmail(
		email: User['email'],
	): Promise<Either<User | undefined, InfrastructureError>> {
		const [user, error] = await async(findUserByEmail(email));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresUsersRepository/findByEmail',
				);
			return [null, infrastructureError];
		}

		return [user, null];
	}

	async create(createUserData: CreateUserData): Promise<Either<User, InfrastructureError>> {
		const [user, error] = await async(createUser(createUserData));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresUsersRepository/create',
				);
			return [null, infrastructureError];
		}

		return [user, null];
	}
}
