import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createHandlers } from '../../app/app.factory.js';
import { throwHttpError } from '../../app/app.http-error.js';
import { AuthService } from '../services/auth.service.js';

const loginValidationSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const registerValidationSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export class AuthController {
	constructor(private readonly authService: AuthService) {}

	login() {
		return createHandlers(zValidator('json', loginValidationSchema), async (c) => {
			try {
				// Validates request body
				const loginDto = c.req.valid('json');
				// Gets access token
				const accessToken = await this.authService.login(loginDto);

				return c.json({ accessToken }, 200);
			} catch (err) {
				throwHttpError(err);
			}
		});
	}

	register() {
		return createHandlers(zValidator('json', registerValidationSchema), async (c) => {
			try {
				// Validates request body
				const registerDto = c.req.valid('json');
				// Gets access token
				const accessToken = await this.authService.register(registerDto);

				return c.json({ accessToken }, 201);
			} catch (err) {
				throwHttpError(err);
			}
		});
	}
}
