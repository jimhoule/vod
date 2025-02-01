import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, index } from 'drizzle-orm/pg-core';

// TABLES
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

export const ProfilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => UsersTable.id, { onDelete: 'cascade' }),
});

export const MoviesTable = pgTable('movies', {
	id: uuid('id').primaryKey().notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }).notNull(),
});

// RELATIONS
export const UsersTableRelations = relations(UsersTable, ({ many }) => {
	return {
		profiles: many(ProfilesTable),
	};
});

export const ProfilesTableRelations = relations(ProfilesTable, ({ one }) => {
	return {
		user: one(UsersTable, {
			fields: [ProfilesTable.userId],
			references: [UsersTable.id],
		}),
	};
});
