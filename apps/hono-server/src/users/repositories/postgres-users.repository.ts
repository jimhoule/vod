import { eq } from 'drizzle-orm';
import { db } from '../../drizzle/db.js';
import { UsersTable } from '../../drizzle/schema.js';
import type { User } from '../models/user.model.js';
import type { UsersRepository } from './users.repository.js';
import type { CreateUserData } from './types/create-user-data.type.js';

export class PostgresUsersRepository implements UsersRepository {
	async findAll(): Promise<User[]> {
		return db.select().from(UsersTable);
	}

	async findById(id: string): Promise<User | undefined> {
		const [user] = await db.select().from(UsersTable).where(eq(UsersTable.id, id));

		return user;
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const [user] = await db.select().from(UsersTable).where(eq(UsersTable.email, email));

		return user;
	}

	async create(createUserData: CreateUserData): Promise<User> {
		const [newUser] = await db.insert(UsersTable).values(createUserData).returning();

		return newUser as User;
	}
}
