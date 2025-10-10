import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { User } from '@packages/models/users/User';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';

export interface UsersRepository {
	findAll(): Promise<Either<User[], InfrastructureError>>;
	findById(id: User['id']): Promise<Either<User | undefined, InfrastructureError>>;
	findByEmail(email: User['email']): Promise<Either<User | undefined, InfrastructureError>>;
	create(createUserData: CreateUserData): Promise<Either<User, InfrastructureError>>;
}
