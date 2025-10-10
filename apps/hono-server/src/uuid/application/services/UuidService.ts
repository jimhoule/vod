import type { Either } from '@packages/core/types/Either';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { UuidProvider } from '@uuid/infrastructure/providers/UuidProvider';

export class UuidService {
	constructor(private readonly uuidProvider: UuidProvider) {}

	generate(): Either<string, ApplicationError> {
		const [uuid, error] = this.uuidProvider.generate();
		if (error) {
			const applicationError = new ApplicationError(
				'UuidService/generate',
				error.message,
				error,
			);
			return [null, applicationError];
		}

		return [uuid, null];
	}
}
