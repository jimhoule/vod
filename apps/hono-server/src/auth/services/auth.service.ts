import { AppError } from '../../app/app.error';
import type { LoginPayload } from './payloads/login.payload';
import type { RegisterPayload } from './payloads/register.payload';
import type { EncryptionService } from '../../encryption/services/encryption.service';
import type { TokensService } from '../../tokens/services/tokens.service';
import type { UsersService } from '../../users/services/users.service';

export class AuthService {
	constructor(
		private readonly encryptionService: EncryptionService,
		private readonly tokensService: TokensService,
		private readonly usersService: UsersService,
	) {}

	async login(loginPayload: LoginPayload): Promise<string> {
		// Gets user by email
		const user = await this.usersService.findByEmail(loginPayload.email);
		if (!user) {
			throw new AppError('Email or password invalid', 400);
		}

		// Validates password
		const isPasswordValid = await this.encryptionService.comparePassword(
			user.password,
			loginPayload.password,
		);
		if (!isPasswordValid) {
			throw new AppError('Email or password invalid', 400);
		}

		// Generates access token
		return this.tokensService.generate({ id: user.id, email: user.email });
	}

	async register(registerPayload: RegisterPayload): Promise<string> {
		// Validates email
		const doesAlreadyExist = await this.usersService.findByEmail(registerPayload.email);
		if (doesAlreadyExist) {
			throw new AppError('Email or password invalid', 400);
		}

		// Hashes password
		const hashedPassword = await this.encryptionService.hashPassword(registerPayload.password);
		// Creates user
		const user = await this.usersService.create({
			...registerPayload,
			password: hashedPassword,
		});

		// Gets access token
		return this.tokensService.generate({ id: user.id, email: user.email });
	}
}
