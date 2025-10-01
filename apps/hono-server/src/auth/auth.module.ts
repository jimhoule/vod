import { Hono } from 'hono';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { encryptionService } from '../encryption/encryption.module';
import { tokensService } from '../tokens/tokens.module';
import { usersService, createUsersTestService } from '../users/users.module';

export const createAuthTestService = () =>
	new AuthService(encryptionService, tokensService, createUsersTestService());
export const createAuthController = (authService: AuthService) => new AuthController(authService);
export const createAuthRoutes = (authController: AuthController) => {
	return new Hono()
		.basePath('/auth')
		.post('/login', ...authController.login())
		.post('/register', ...authController.register());
};

export const authService = new AuthService(encryptionService, tokensService, usersService);
export const authRoutes = createAuthRoutes(createAuthController(authService));
