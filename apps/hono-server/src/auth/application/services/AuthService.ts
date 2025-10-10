import type { Either } from '@packages/core/types/Either';
import type { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import type { User } from '@packages/models/users/User';
import type { LoginPayload } from '@auth/application/services/payloads/LoginPayload';
import type { RegisterPayload } from '@auth/application/services/payloads/RegisterPayload';
import type { EncryptionService } from '@encryption/application/services/EncryptionService';
import type { TokensService } from '@tokens/application/services/TokensService';
import type { UsersService } from '@users/application/services/UsersService';

export class AuthService {
	constructor(
		private readonly applicationErrorMapper: ApplicationErrorMapper,
		private readonly encryptionService: EncryptionService,
		private readonly tokensService: TokensService,
		private readonly usersService: UsersService,
	) {}

	private async generateAccessToken(
		id: User['id'],
		email: User['email'],
		context: string,
	): Promise<Either<string, ApplicationError>> {
		const [accessToken, error] = await this.tokensService.generate({
			payload: {
				id,
				email,
			},
		});
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(context, error);
			return [null, applicationError];
		}

		return [accessToken, null];
	}

	async login(loginPayload: LoginPayload): Promise<Either<string, ApplicationError>> {
		// Gets user by email
		const [user, findUserByEmailError] = await this.usersService.findByEmail(
			loginPayload.email,
		);
		if (findUserByEmailError) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'AuthService/login',
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
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'AuthService/login',
				comparePasswordError,
			);
			return [null, applicationError];
		}

		if (!isPasswordValid) {
			const applicationError =
				this.applicationErrorMapper.toApplicationError('AuthService/login');
			return [null, applicationError];
		}

		// Generates access token
		return this.generateAccessToken(castUser.id, castUser.email, 'AuthService/login');
	}

	async register(registerPayload: RegisterPayload): Promise<Either<string, ApplicationError>> {
		// Validates email
		const [doesAlreadyExist, findUserByEmailError] = await this.usersService.findByEmail(
			registerPayload.email,
		);
		if (findUserByEmailError) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'AuthService/register',
				findUserByEmailError,
			);
			return [null, applicationError];
		}

		if (doesAlreadyExist) {
			const applicationError =
				this.applicationErrorMapper.toApplicationError('AuthService/register');
			return [null, applicationError];
		}

		// Hashes password
		const [hashedPassword, hashPasswordError] = await this.encryptionService.hashPassword({
			password: registerPayload.password,
		});
		if (hashPasswordError) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'AuthService/register',
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
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'AuthService/register',
				createUserError,
			);
			return [null, applicationError];
		}

		// Generates access token
		return this.generateAccessToken(user.id, user.email, 'AuthService/register');
	}
}
