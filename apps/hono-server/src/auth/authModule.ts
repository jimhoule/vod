import { Hono } from 'hono';
import { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import { HttpPresentationErrorMapper } from '@packages/errors/presentation/http/mappers/HttpPresentationErrorMapper';
import { AuthService } from '@auth/application/services/AuthService';
import { AuthController } from '@auth/presentation/http/controllers/AuthController';
import { encryptionService } from '@encryption/encryptionModule';
import { tokensService } from '@tokens/tokensModule';
import { usersService, createUsersTestService } from '@users/usersModule';

export const createAuthTestService = () =>
	new AuthService(
		new ApplicationErrorMapper(),
		encryptionService,
		tokensService,
		createUsersTestService(),
	);
export const createAuthController = (authService: AuthService) =>
	new AuthController(new HttpPresentationErrorMapper(), authService);
export const createAuthRoutes = (authController: AuthController) => {
	return new Hono()
		.basePath('/auth')
		.post('/login', ...authController.login())
		.post('/register', ...authController.register());
};

export const authService = new AuthService(
	new ApplicationErrorMapper(),
	encryptionService,
	tokensService,
	usersService,
);
export const authRoutes = createAuthRoutes(createAuthController(authService));
