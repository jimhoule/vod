import { expect, describe, it } from 'vitest';
import type { User } from '@packages/models/users/User';
import { createUsersTestService } from '@users/usersModule';
import type { CreateUserPayload } from '@users/application/services/payloads/CreateUserPayload';

describe('UsersService', (): void => {
	const getTestContext = async () => {
		const usersService = createUsersTestService();

		const createUserPayload: CreateUserPayload = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const [user] = await usersService.create(createUserPayload);

		return {
			user: user as User,
			createUserPayload,
			usersService,
		};
	};

	it('should create user', async () => {
		const { user, createUserPayload } = await getTestContext();

		expect(user).toBeDefined();
		expect(user.firstName).toEqual(createUserPayload.firstName);
		expect(user.lastName).toEqual(createUserPayload.lastName);
		expect(user.email).toEqual(createUserPayload.email);
		expect(user.password).toEqual(createUserPayload.password);
	});

	it('should find all users', async () => {
		const { user, usersService } = await getTestContext();

		const [users] = await usersService.findAll();
		const castUsers = users as User[];

		expect(user).toBeDefined();
		expect(castUsers).toBeDefined();
		expect(castUsers).toHaveLength(1);
		expect(castUsers[0]).toEqual(user);
	});

	it('should find user by ID', async () => {
		const { user, usersService } = await getTestContext();

		const [foundUser] = await usersService.findById(user.id);

		expect(user).toBeDefined();
		expect(foundUser).toBeDefined();
		expect(foundUser).toEqual(user);
	});

	it('should not find user by ID', async () => {
		const { usersService } = await getTestContext();

		const [user] = await usersService.findById('340f82f1-0e78-4a5c-b7ab-c26bcf56cf09');

		expect(user).not.toBeDefined();
	});

	it('should find user by email', async () => {
		const { user, usersService } = await getTestContext();

		const [foundUser] = await usersService.findByEmail(user.email);

		expect(user).toBeDefined();
		expect(foundUser).toBeDefined();
		expect(foundUser).toEqual(user);
	});

	it('should not find user by email', async () => {
		const { usersService } = await getTestContext();

		const [user] = await usersService.findByEmail('fakeEmail');

		expect(user).not.toBeDefined();
	});
});
