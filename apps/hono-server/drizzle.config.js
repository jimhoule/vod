import { defineConfig } from 'drizzle-kit';
import { configs } from './src/configs';

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: configs.db.url
    },
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    verbose: true,
    strict: true,
});