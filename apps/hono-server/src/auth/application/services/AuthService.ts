import type { User } from '@packages/models/users/User';
import { AppError } from '@app/app.error';
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

	private generateAccessToken(id: User['id'], email: User['email']): Promise<string> {
		return this.tokensService.generate({
			payload: {
				id,
				email,
			},
		});
	}

	async login(loginPayload: LoginPayload): Promise<string> {
		// Gets user by email
		const user = await this.usersService.findByEmail(loginPayload.email);
		if (!user) {
			throw new AppError('Email or password invalid', 400);
		}

		// Validates password
		const isPasswordValid = await this.encryptionService.comparePassword({
			password: user.password,
			hashedPassword: loginPayload.password,
		});
		if (!isPasswordValid) {
			throw new AppError('Email or password invalid', 400);
		}

		// Generates access token
		return this.generateAccessToken(user.id, user.email);
	}

	async register(registerPayload: RegisterPayload): Promise<string> {
		// Validates email
		const doesAlreadyExist = await this.usersService.findByEmail(registerPayload.email);
		if (doesAlreadyExist) {
			throw new AppError('Email or password invalid', 400);
		}

		// Hashes password
		const hashedPassword = await this.encryptionService.hashPassword({
			password: registerPayload.password,
		});
		// Creates user
		const user = await this.usersService.create({
			...registerPayload,
			password: hashedPassword,
		});

		// Gets access token
		return this.generateAccessToken(user.id, user.email);
	}
}
