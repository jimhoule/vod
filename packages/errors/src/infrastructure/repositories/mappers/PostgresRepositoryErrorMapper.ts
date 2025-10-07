import { InfrastructureError } from '../../InfrastructureError';
import { ForeignKeyViolationError } from '../ForeignKeyViolationError';
import { UniqueViolationError } from '../UniqueViolationError';

export class PostgresRepositoryErrorMapper {
	toInfrastructureError(postgresErrorCode: string): typeof InfrastructureError {
		switch (postgresErrorCode) {
			case '23503':
				return ForeignKeyViolationError;

			case '23505':
				return UniqueViolationError;

			default:
				return InfrastructureError;
		}
	}
}
