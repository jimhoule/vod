import { async, type AsyncResult } from '@packages/core/async';
import type { PostgresError } from '@packages/db/postgres';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { PostgresRepositoryErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryErrorMapper';
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
	constructor(private readonly postgresRepositoryErrorMapper: PostgresRepositoryErrorMapper) {}

	async findAll(): Promise<AsyncResult<User[], InfrastructureError>> {
		const [users, error] = await async(findAllUsers());
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresUsersRepository/findAll',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [users, null];
	}

	async findById(id: User['id']): Promise<AsyncResult<User | undefined, InfrastructureError>> {
		const [user, error] = await async(findUserById(id));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresUsersRepository/findById',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [user, null];
	}

	async findByEmail(
		email: User['email'],
	): Promise<AsyncResult<User | undefined, InfrastructureError>> {
		const [user, error] = await async(findUserByEmail(email));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresUsersRepository/findByEmail',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [user, null];
	}

	async create(createUserData: CreateUserData): Promise<AsyncResult<User, InfrastructureError>> {
		const [user, error] = await async(createUser(createUserData));
		if (error) {
			const postgresError = error.cause as PostgresError;
			const MappedInfrastructureError =
				this.postgresRepositoryErrorMapper.toInfrastructureError(postgresError.code);
			const mappedInfrastructureError = new MappedInfrastructureError(
				'PostgresUsersRepository/create',
				postgresError.message,
			);

			return [null, mappedInfrastructureError];
		}

		return [user, null];
	}
}
