import { Hono } from 'hono';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { encryptionService } from '../encryption/encryption.module.js';
import { tokensService } from '../tokens/tokens.module.js';
import { usersService, createUsersTestService } from '../users/users.module.js';

export const createAuthRoutes = (authController: AuthController) => {
    return new Hono()
        .basePath('/auth')
        .post('/login', ...authController.login())
        .post('/register', ...authController.register());
};

export const authService = new AuthService(encryptionService, tokensService, usersService);
export const authRoutes = createAuthRoutes(new AuthController(authService));

export const createAuthTestService = () =>
    new AuthService(encryptionService, tokensService, createUsersTestService());
