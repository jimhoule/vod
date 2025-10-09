import type { AsyncResult } from '@packages/core/async';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { User } from '@packages/models/users/User';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';

export interface UsersRepository {
	findAll(): Promise<AsyncResult<User[], InfrastructureError>>;
	findById(id: User['id']): Promise<AsyncResult<User | undefined, InfrastructureError>>;
	findByEmail(email: User['email']): Promise<AsyncResult<User | undefined, InfrastructureError>>;
	create(createUserData: CreateUserData): Promise<AsyncResult<User, InfrastructureError>>;
}
