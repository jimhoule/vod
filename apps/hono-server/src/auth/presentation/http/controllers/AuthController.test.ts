import { expect, describe, it } from 'vitest';
import { testClient } from 'hono/testing';
import { createAuthTestService, createAuthController, createAuthRoutes } from '@auth/authModule';

describe('AuthController', (): void => {
	const getTestContext = async () => {
		const authRoutes = createAuthRoutes(createAuthController(createAuthTestService()));
		const mockClient = testClient(authRoutes);

		const registerDto = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const registerResponse = await mockClient.auth.register.$post({
			json: {
				...registerDto,
			},
		});

		return {
			mockClient,
			registerDto,
			registerResponse,
		};
	};

	it('should register', async () => {
		const { registerResponse } = await getTestContext();

		expect(registerResponse.status).toEqual(201);
	});

	it('should login', async () => {
		const { mockClient, registerDto } = await getTestContext();

		const response = await mockClient.auth.login.$post({
			json: {
				email: registerDto.email,
				password: registerDto.password,
			},
		});

		expect(response.status).toEqual(200);
	});
});
