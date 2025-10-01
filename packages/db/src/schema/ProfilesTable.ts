import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { UsersTable } from './UsersTable';

export const ProfilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => UsersTable.id, { onDelete: 'cascade' }),
});
