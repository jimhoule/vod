import type { Either } from '@packages/core/types/Either';
import type { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import type { UuidProvider } from '@uuid/infrastructure/providers/UuidProvider';

export class UuidService {
	constructor(
		private readonly applicationErrorMapper: ApplicationErrorMapper,
		private readonly uuidProvider: UuidProvider,
	) {}

	generate(): Either<string, ApplicationError> {
		const [uuid, error] = this.uuidProvider.generate();
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'UuidService/generate',
				error,
			);
			return [null, applicationError];
		}

		return [uuid, null];
	}
}
