import { expect, describe, it } from 'vitest';
import { createAuthTestService } from '../auth.module.js';
import { tokensService } from '../../tokens/tokens.module.js';
import type { User } from '../../users/models/user.model.js';

describe('AuthService', (): void => {
	const getTestContext = async () => {
		const authService = createAuthTestService();

		const registerPayload = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};

		const accessToken = await authService.register(
			registerPayload.firstName,
			registerPayload.lastName,
			registerPayload.email,
			registerPayload.password,
		);
		const accessTokenPayload = tokensService.decode<{ id: string; email: string }>(accessToken);

		const user: User = {
			id: accessTokenPayload.id,
			...registerPayload,
		};

		return {
			user,
			accessToken,
			accessTokenPayload,
			authService,
		};
	};

	it('should register', async () => {
		const { user, accessToken, accessTokenPayload } = await getTestContext();

		expect(accessToken).toBeDefined();
		expect(accessTokenPayload).toEqual({
			id: user.id,
			email: user.email,
		});
	});

	it('should login', async () => {
		const { user, authService } = await getTestContext();

		const accessToken = await authService.login(user.email, user.password);

		expect(accessToken).toBeDefined();
	});
});
