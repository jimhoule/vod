import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';

export interface TokensProvider {
	generate<TPayload>(payload: TPayload): Promise<Either<string, InfrastructureError>>;
	decode<TPayload>(token: string): Either<TPayload, InfrastructureError>;
}
