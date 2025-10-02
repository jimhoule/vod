import { testClient } from 'hono/testing';
import { describe, expect, it } from 'vitest';
import {
	createUsersTestService,
	createUsersController,
	createUsersRoutes,
} from '@users/users.module';
import type { CreateUserPayload } from '@users/services/payloads/create-user.payload';
import { tokensService } from '@tokens/tokens.module';

describe('UsersController', async (): Promise<void> => {
	const getTestContext = async () => {
		const usersService = createUsersTestService();
		const usersRoutes = createUsersRoutes(createUsersController(usersService));
		const mockClient = testClient(usersRoutes);

		const createUserPayload: CreateUserPayload = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const user = await usersService.create(createUserPayload);

		const accessToken = await tokensService.generate({ id: user.id, email: user.email });

		return {
			mockClient,
			user,
			accessToken,
		};
	};

	it('should find all users', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.users.$get(undefined, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		expect(response.status).toEqual(200);
	});

	it('should try to find all users without access token', async () => {
		const { mockClient } = await getTestContext();

		const response = await mockClient.users.$get();

		expect(response.status).toEqual(401);
	});

	it('should find user by ID', async () => {
		const { user, mockClient, accessToken } = await getTestContext();

		const response = await mockClient.users[':id'].$get(
			{
				param: {
					id: user.id,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(200);
	});

	it('should not find user by ID', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.users[':id'].$get(
			{
				param: {
					id: '340f82f1-0e78-4a5c-b7ab-c26bcf56cf09',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(404);
	});

	it('should try to find user by ID without access token', async () => {
		const { user, mockClient } = await getTestContext();

		const response = await mockClient.users[':id'].$get({
			param: {
				id: user.id,
			},
		});

		expect(response.status).toEqual(401);
	});

	it('should try to find user by ID with invalid uuid', async () => {
		const { mockClient, accessToken } = await getTestContext();

		const response = await mockClient.users[':id'].$get(
			{
				param: {
					id: 'fakeId',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		expect(response.status).toEqual(400);
	});
});
