import { db } from '@packages/db';
import { eq } from '@packages/db/orm';
import { UsersTable } from '@packages/db/schema/UsersTable';
import type { User } from '@packages/models/users/User';
import type { UsersRepository } from './users.repository';
import type { CreateUserData } from './types/create-user-data.type';

export class PostgresUsersRepository implements UsersRepository {
	async findAll(): Promise<User[]> {
		return db.select().from(UsersTable);
	}

	async findById(id: User['id']): Promise<User | undefined> {
		const [user] = await db.select().from(UsersTable).where(eq(UsersTable.id, id));

		return user;
	}

	async findByEmail(email: User['email']): Promise<User | undefined> {
		const [user] = await db.select().from(UsersTable).where(eq(UsersTable.email, email));

		return user;
	}

	async create(createUserData: CreateUserData): Promise<User> {
		const [newUser] = await db.insert(UsersTable).values(createUserData).returning();

		return newUser as User;
	}
}
