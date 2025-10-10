import type { Either } from '@packages/core/types/Either';
import type { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import type { ComparePasswordPayload } from '@encryption/application/services/payloads/ComparePasswordPayload';
import type { HashPasswordPayload } from '@encryption/application/services/payloads/HashPasswordPayload';
import type { EncryptionProvider } from '@encryption/infrastructure/providers/EncryptionProvider';

export class EncryptionService {
	constructor(
		private readonly applicationErrorMapper: ApplicationErrorMapper,
		private readonly encryptionProvider: EncryptionProvider,
	) {}

	async hashPassword(
		hashPasswordPayload: HashPasswordPayload,
	): Promise<Either<string, ApplicationError>> {
		const [hashedPassword, error] = await this.encryptionProvider.hashPassword(
			hashPasswordPayload.password,
		);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'EncryptionService/hashPassword',
				error,
			);
			return [null, applicationError];
		}

		return [hashedPassword, null];
	}

	async comparePassword(
		comparePasswordPayload: ComparePasswordPayload,
	): Promise<Either<boolean, ApplicationError>> {
		const [isPasswordValid, error] = await this.encryptionProvider.comparePassword(
			comparePasswordPayload.password,
			comparePasswordPayload.hashedPassword,
		);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'EncryptionService/comparePassword',
				error,
			);
			return [null, applicationError];
		}

		return [isPasswordValid, null];
	}
}
