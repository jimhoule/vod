// import { DrizzleQueryError } from 'drizzle-orm';
// import { PostgresError } from 'postgres'; // Assuming you're using postgres.js

// try {
//   // Your Drizzle ORM query here
// } catch (error) {
//   if (error instanceof DrizzleQueryError) {
//     const postgresError = error.cause as PostgresError; // Cast to specific Postgres error type
//     console.error('Drizzle Query Error:', error.message);
//     console.error('PostgreSQL Error Code:', postgresError.code);
//     console.error('PostgreSQL Error Message:', postgresError.message);
//     // Handle specific PostgreSQL error codes or messages
//   } else {
//     console.error('Unexpected error:', error);
//   }
// }

import { InfrastructureError } from '../../InfrastructureError';
import { ForeignKeyViolationError } from '../ForeignKeyViolationError';
import { UniqueViolationError } from '../UniqueViolationError';

export const getPostgresRepositoryInfrastructureError = (
	postgresErrorCode: string,
): typeof InfrastructureError => {
	switch (postgresErrorCode) {
		case '23503':
			return ForeignKeyViolationError;

		case '23505':
			return UniqueViolationError;

		default:
			return InfrastructureError;
	}
};
