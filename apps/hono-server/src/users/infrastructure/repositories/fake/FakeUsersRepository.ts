import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import { UniqueViolationError } from '@packages/errors/infrastructure/repositories/UniqueViolationError';
import type { User } from '@packages/models/users/User';
import type { UsersRepository } from '@users/infrastructure/repositories/UsersRepository';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';

export class FakeUsersRepository implements UsersRepository {
	private users: User[] = [];

	async findAll(): Promise<Either<User[], InfrastructureError>> {
		return [this.users, null];
	}

	async findById(id: User['id']): Promise<Either<User | undefined, InfrastructureError>> {
		const user = this.users.find((user: User): boolean => user.id === id);

		return [user, null];
	}

	async findByEmail(
		email: User['email'],
	): Promise<Either<User | undefined, InfrastructureError>> {
		const user = this.users.find((user: User): boolean => user.email === email);

		return [user, null];
	}

	async create(createUserData: CreateUserData): Promise<Either<User, InfrastructureError>> {
		const [doesAlreadyExist, error] = await this.findByEmail(createUserData.email);
		if (error) {
			return [null, error];
		}

		// NOTE: Fakes unique constraint on email
		if (doesAlreadyExist) {
			const uniqueViolationError = new UniqueViolationError(
				`User with email ${createUserData.email} already exists`,
				'FakeUsersRepository/create',
			);
			return [null, uniqueViolationError];
		}

		const user = createUserData;

		// NOTE: Creates a copy with a new reference
		this.users.push(JSON.parse(JSON.stringify(user)));

		return [user as User, null];
	}
}
