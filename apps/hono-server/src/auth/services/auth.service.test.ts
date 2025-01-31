import { expect, describe, it } from 'vitest';
import { createAuthTestService } from '../auth.module.js';
import type { LoginPayload } from './payloads/login.payload.js';
import type { RegisterPayload } from './payloads/register.payload.js';
import { tokensService } from '../../tokens/tokens.module.js';
import type { User } from '../../users/models/user.model.js';

describe('AuthService', (): void => {
	const getTestContext = async () => {
		const authService = createAuthTestService();

		const registerPayload: RegisterPayload = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const accessToken = await authService.register(registerPayload);
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

		const loginPayload: LoginPayload = {
			email: user.email,
			password: user.password,
		};
		const accessToken = await authService.login(loginPayload);

		expect(accessToken).toBeDefined();
	});
});
