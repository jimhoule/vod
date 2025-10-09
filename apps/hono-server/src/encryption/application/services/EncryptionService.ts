import type { AsyncResult } from '@packages/core/async';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ComparePasswordPayload } from '@encryption/application/services/payloads/ComparePasswordPayload';
import type { HashPasswordPayload } from '@encryption/application/services/payloads/HashPasswordPayload';
import type { EncryptionProvider } from '@encryption/infrastructure/providers/EncryptionProvider';

export class EncryptionService {
	constructor(private readonly encryptionProvider: EncryptionProvider) {}

	async hashPassword(
		hashPasswordPayload: HashPasswordPayload,
	): Promise<AsyncResult<string, ApplicationError>> {
		const [hashedPassword, error] = await this.encryptionProvider.hashPassword(
			hashPasswordPayload.password,
		);
		if (error) {
			const applicationError = new ApplicationError(
				'EncryptionService/hashPassword',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [hashedPassword, null];
	}

	async comparePassword(
		comparePasswordPayload: ComparePasswordPayload,
	): Promise<AsyncResult<boolean, ApplicationError>> {
		const [isPasswordValid, error] = await this.encryptionProvider.comparePassword(
			comparePasswordPayload.password,
			comparePasswordPayload.hashedPassword,
		);
		if (error) {
			const applicationError = new ApplicationError(
				'EncryptionService/comparePassword',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [isPasswordValid, null];
	}
}
