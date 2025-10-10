import type { PostgresError } from '@packages/db/postgres';
import { InfrastructureError } from '../../InfrastructureError';
import { ForeignKeyViolationError } from '../ForeignKeyViolationError';
import { UniqueViolationError } from '../UniqueViolationError';

export class PostgresRepositoryInfrastructureErrorMapper {
	toInfrastructureError(
		postgresError: PostgresError,
		context: InfrastructureError['context'],
	): InfrastructureError {
		const { code, message } = postgresError;

		switch (code) {
			case '23503':
				return new ForeignKeyViolationError(context, message);

			case '23505':
				return new UniqueViolationError(context, message);

			default:
				return new InfrastructureError(
					'InfrastructureError',
					context,
					'Error happened in the Application layer',
				);
		}
	}
}
