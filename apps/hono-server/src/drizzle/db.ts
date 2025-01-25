import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { appConfigs } from '../app/app.configs.js';

const queryClient = postgres(appConfigs.db.url);
export const db = drizzle(queryClient, { schema, logger: true });
