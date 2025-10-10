import { expect, describe, it } from 'vitest';
import type { User } from '@packages/models/users/User';
import { createAuthTestService } from '@auth/authModule';
import type { LoginPayload } from '@auth/application/services/payloads/LoginPayload';
import type { RegisterPayload } from '@auth/application/services/payloads/RegisterPayload';
import { tokensService } from '@tokens/tokensModule';

describe('AuthService', (): void => {
	const getTestContext = async () => {
		const authService = createAuthTestService();

		const registerPayload: RegisterPayload = {
			firstName: 'Jenny',
			lastName: 'Doe',
			email: 'test@test.com',
			password: 'password',
		};
		const [accessToken] = await authService.register(registerPayload);
		const [accessTokenPayload] = tokensService.decode<Pick<User, 'id' | 'email'>>({
			token: accessToken as string,
		});

		const castAccessTokenPayload = accessTokenPayload as Pick<User, 'id' | 'email'>;

		const user: User = {
			id: castAccessTokenPayload.id,
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
