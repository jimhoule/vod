import { Hono } from 'hono';
import { AuthService } from '@auth/application/services/AuthService';
import { AuthController } from '@auth/presentation/http/controllers/AuthController';
import { encryptionService } from '@encryption/encryptionModule';
import { tokensService } from '@tokens/tokensModule';
import { usersService, createUsersTestService } from '@users/usersModule';

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
