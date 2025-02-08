import type { LoginPayload } from './types/LoginPayload';
import type { RegisterPayload } from './types/RegisterPayload';
import type { Tokens } from './types/Tokens';
import { apiClient } from '../apiClient';

export async function login(loginPayload: LoginPayload) {
	const response = await apiClient.auth.login.$post({
		json: loginPayload,
	});

	return (await response.json()) as Tokens;
}

export function register(registerPayload: RegisterPayload) {
	console.log(registerPayload);
}
