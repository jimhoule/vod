import { LoginPayload } from './payloads/LoginPayload';
import { RegisterPayload } from './payloads/RegisterPayload';
import { apiClient } from '../apiClient';

export async function login(loginPayload: LoginPayload) {
	const response = await apiClient.auth.login.$post({
		json: loginPayload,
	});

	return (await response.json()) as { accessToken: string };
}

export function register(registerPayload: RegisterPayload) {
	console.log(registerPayload);
}
