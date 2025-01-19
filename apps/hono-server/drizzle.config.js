import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgres://postgres:password@localhost:5430/vod',
    },
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    verbose: true,
    strict: true,
});