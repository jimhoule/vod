import { expect, describe, it } from 'vitest';
import { testClient } from 'hono/testing';
import { AuthController } from './auth.controller.js';
import { createAuthRoutes, createAuthTestService } from './auth.module.js';

describe('AuthController', (): void => {
	const getTestContext = async () => {
		const authRoutes = createAuthRoutes(new AuthController(createAuthTestService()));
		const mockClient = testClient(authRoutes);

		const registerDto = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const register = () => {
			return mockClient.auth.register.$post({
				json: {
					...registerDto,
				},
			});
		};

		return {
			mockClient,
			registerDto,
			register,
		};
	};

	it('should register', async () => {
		const { register } = await getTestContext();

		const response = await register();

		expect(response.status).toEqual(201);
	});

	it('should login', async () => {
		const { mockClient, register, registerDto } = await getTestContext();

		await register();
		const response = await mockClient.auth.login.$post({
			json: {
				email: registerDto.email,
				password: registerDto.password,
			},
		});

		expect(response.status).toEqual(200);
	});
});
