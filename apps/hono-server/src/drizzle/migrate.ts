import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { appConfigs } from '../app/app.configs.js';

const migrationClient = postgres(appConfigs.db.url, {
	max: 1,
});

async function exec() {
	await migrate(drizzle(migrationClient), { migrationsFolder: './src/drizzle/migrations' });
	await migrationClient.end();
}

exec();
