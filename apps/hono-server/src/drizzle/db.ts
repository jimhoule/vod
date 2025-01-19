import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const queryClient = postgres('postgres://postgres:password@localhost:5430/vod');
export const db = drizzle(queryClient, { schema, logger: true });
