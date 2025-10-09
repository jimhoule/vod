import type { AsyncResult } from '@packages/core/async';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { User } from '@packages/models/users/User';
import type { LoginPayload } from '@auth/application/services/payloads/LoginPayload';
import type { RegisterPayload } from '@auth/application/services/payloads/RegisterPayload';
import type { EncryptionService } from '@encryption/application/services/EncryptionService';
import type { TokensService } from '@tokens/application/services/TokensService';
import type { UsersService } from '@users/application/services/UsersService';

export class AuthService {
	constructor(
		private readonly encryptionService: EncryptionService,
		private readonly tokensService: TokensService,
		private readonly usersService: UsersService,
	) {}

	private async generateAccessToken(
		id: User['id'],
		email: User['email'],
	): Promise<AsyncResult<string, ApplicationError>> {
		const accessToken = await this.tokensService.generate({
			payload: {
				id,
				email,
			},
		});

		return [accessToken, null];
	}

	async login(loginPayload: LoginPayload): Promise<AsyncResult<string, ApplicationError>> {
		// Gets user by email
		const [user, findUserByEmailError] = await this.usersService.findByEmail(
			loginPayload.email,
		);
		if (findUserByEmailError) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				'Email or password invalid',
				findUserByEmailError,
			);
			return [null, applicationError];
		}

		const castUser = user as User;

		// Validates password
		const [isPasswordValid, comparePasswordError] =
			await this.encryptionService.comparePassword({
				password: castUser.password,
				hashedPassword: loginPayload.password,
			});
		if (comparePasswordError) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				comparePasswordError.message,
				comparePasswordError,
			);
			return [null, applicationError];
		}

		if (!isPasswordValid) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				'Email or password invalid',
			);
			return [null, applicationError];
		}

		// Generates access token
		return this.generateAccessToken(castUser.id, castUser.email);
	}

	async register(
		registerPayload: RegisterPayload,
	): Promise<AsyncResult<string, ApplicationError>> {
		// Validates email
		const [doesAlreadyExist, findUserByEmailError] = await this.usersService.findByEmail(
			registerPayload.email,
		);
		if (findUserByEmailError) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				'',
				findUserByEmailError,
			);
			return [null, applicationError];
		}

		if (doesAlreadyExist) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				'User already exists',
			);
			return [null, applicationError];
		}

		// Hashes password
		const [hashedPassword, hashPasswordError] = await this.encryptionService.hashPassword({
			password: registerPayload.password,
		});
		if (hashPasswordError) {
			const applicationError = new ApplicationError(
				'AuthService/login',
				hashPasswordError.message,
				hashPasswordError,
			);
			return [null, applicationError];
		}

		// Creates user
		const [user, createUserError] = await this.usersService.create({
			...registerPayload,
			password: hashedPassword,
		});
		if (createUserError) {
			const applicationError = new ApplicationError('AuthService/login', '', createUserError);
			return [null, applicationError];
		}

		// Generates access token
		return this.generateAccessToken(user.id, user.email);
	}
}
