import { hash, compare } from 'bcrypt';
import { async, type AsyncResult } from '@packages/core/async';
import { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { EncryptionProvider } from '@encryption/infrastructure/providers/EncryptionProvider';

export class BcryptEncryptionProvider implements EncryptionProvider {
	async hashPassword(password: string): Promise<AsyncResult<string, InfrastructureError>> {
		// return hash(password, 10);
		const [hashedPassword, error] = await async(hash(password, 10));
		if (error) {
			const infrastructureError = new InfrastructureError(
				'BcryptEncryptionProvider/comparePassword',
				'Error hasing password',
			);
			return [null, infrastructureError];
		}

		return [hashedPassword, null];
	}

	async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<AsyncResult<boolean, InfrastructureError>> {
		const [isPasswordValid, error] = await async(compare(hashedPassword, password));
		if (error) {
			const infrastructureError = new InfrastructureError(
				'BcryptEncryptionProvider/comparePassword',
				'Error comparing password',
			);
			return [null, infrastructureError];
		}

		return [isPasswordValid, null];
	}
}
