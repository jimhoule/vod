import { defineConfig } from 'drizzle-kit';
import { env } from '@packages/env';

export default defineConfig({
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DB_URL,
	},
	schema: './src/schema/*.ts',
	out: './migrations',
	verbose: true,
	strict: true,
});
