import { AppError } from '../core/app.error.js';
import type { EncryptionService } from '../encryption/encryption.service.js';
import type { TokensService } from '../tokens/tokens.service.js';
import type { UsersService } from '../users/users.service.js';

export class AuthService {
    constructor(
        private readonly encryptionService: EncryptionService,
        private readonly tokensService: TokensService,
        private readonly usersService: UsersService,
    ) {}

    async login(email: string, password: string): Promise<string> {
        // Gets user by email
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new AppError('Email or password invalid', 400);
        }

        // Validates password
        const isPasswordValid = await this.encryptionService.comparePassword(
            user.password,
            password,
        );
        if (!isPasswordValid) {
            throw new AppError('Email or password invalid', 400);
        }

        // Generates access token
        return this.tokensService.generateToken({ id: user.id, email });
    }

    async register(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<string> {
        // Validates email
        const doesAlreadyExist = await this.usersService.findByEmail(email);
        if (doesAlreadyExist) {
            throw new AppError('Email or password invalid', 400);
        }

        // Hashes password
        const hashedPassword = await this.encryptionService.hashPassword(password);
        // Creates user
        const user = await this.usersService.create(firstName, lastName, email, hashedPassword);

        // Gets access token
        return this.tokensService.generateToken({ id: user.id, email: user.email });
    }
}
