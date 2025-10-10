import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';

export interface UuidProvider {
	generate(): Either<string, InfrastructureError>;
}
