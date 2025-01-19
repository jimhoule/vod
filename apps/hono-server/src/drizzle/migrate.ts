import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres('postgres://postgres:password@localhost:5430/vod', {
    max: 1,
});

async function exec() {
    await migrate(drizzle(migrationClient), { migrationsFolder: './src/drizzle/migrations' });
    await migrationClient.end();
}

exec();
