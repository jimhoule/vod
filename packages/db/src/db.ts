import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { MoviesTable } from './schema/MoviesTable';
import { ProfilesTable } from './schema/ProfilesTable';
import { UsersTable } from './schema/UsersTable';
import { env } from '@packages/env';

const schema = {
	MoviesTable,
	ProfilesTable,
	UsersTable,
};

const postgresClient = postgres(env.DB_URL);

export const db = drizzle(postgresClient, { schema, logger: true });
