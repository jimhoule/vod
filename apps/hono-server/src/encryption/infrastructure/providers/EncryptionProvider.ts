import type { AsyncResult } from '@packages/core/async';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';

export interface EncryptionProvider {
	hashPassword(password: string): Promise<AsyncResult<string, InfrastructureError>>;
	comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<AsyncResult<boolean, InfrastructureError>>;
}
