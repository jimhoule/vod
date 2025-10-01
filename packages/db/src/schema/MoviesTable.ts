import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const MoviesTable = pgTable('movies', {
	id: uuid('id').primaryKey().notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }).notNull(),
});
