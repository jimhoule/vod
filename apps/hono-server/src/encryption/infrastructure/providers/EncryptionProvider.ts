import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';

export interface EncryptionProvider {
	hashPassword(password: string): Promise<Either<string, InfrastructureError>>;
	comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<Either<boolean, InfrastructureError>>;
}
