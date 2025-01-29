import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL,
    },
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    verbose: true,
    strict: true,
});