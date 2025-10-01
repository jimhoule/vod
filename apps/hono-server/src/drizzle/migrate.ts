import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '@packages/env';
const migrationClient = postgres(env.DB_URL, {
	max: 1,
});

async function exec() {
	await migrate(drizzle(migrationClient), { migrationsFolder: './src/drizzle/migrations' });
	await migrationClient.end();
}

exec();
