import { db } from '@packages/db';
import { eq } from '@packages/db/orm';
import { UsersTable } from '@packages/db/schema/UsersTable';
import type { User } from '@packages/models/users/User';
import type { CreateUserData } from '@users/infrastructure/repositories/types/CreateUserData';

export const findAllUsers = async (): Promise<User[]> => db.select().from(UsersTable);

export const findUserById = async (id: User['id']): Promise<User | undefined> => {
	const [user] = await db.select().from(UsersTable).where(eq(UsersTable.id, id));

	return user;
};

export const findUserByEmail = async (email: User['email']): Promise<User | undefined> => {
	const [user] = await db.select().from(UsersTable).where(eq(UsersTable.email, email));

	return user;
};

export const createUser = async (createUserData: CreateUserData): Promise<User> => {
	const [newUser] = await db.insert(UsersTable).values(createUserData).returning();

	return newUser as User;
};
