import { randomUUID } from 'node:crypto';
import { sync } from '@packages/core/sync';
import type { Either } from '@packages/core/types/Either';
import { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { UuidProvider } from '@uuid/infrastructure/providers/UuidProvider';

export class CryptoUuidProvider implements UuidProvider {
	generate(): Either<string, InfrastructureError> {
		const [uuid, error] = sync(randomUUID);
		if (error) {
			const infrastructureError = new InfrastructureError(
				'InfrastructureError',
				'CryptoUuidProvider/generate',
				'Error generating uuid',
			);
			return [null, infrastructureError];
		}

		return [uuid, null];
	}
}
