import { pgTable, uuid, varchar, index } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable(
	'users',
	{
		id: uuid('id').primaryKey().notNull(),
		firstName: varchar('first_name', { length: 255 }).notNull(),
		lastName: varchar('last_name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		password: varchar('password', { length: 255 }).notNull(),
	},
	(table) => {
		return [
			{
				emailIndex: index('email_index').on(table.email),
			},
		];
	},
);
