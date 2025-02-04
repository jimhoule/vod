import { LoginPayload } from './payloads/LoginPayload';
import { RegisterPayload } from './payloads/RegisterPayload';

export function login(loginPayload: LoginPayload) {
	console.log(loginPayload);
}

export function register(registerPayload: RegisterPayload) {
	console.log(registerPayload);
}
