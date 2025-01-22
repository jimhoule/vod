import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { configs } from '../configs.js';

const queryClient = postgres(configs.db.url);
export const db = drizzle(queryClient, { schema, logger: true });
