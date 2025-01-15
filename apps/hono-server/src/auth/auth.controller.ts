import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AuthService } from './auth.service.js';
import { AppError } from '../core/app.error.js';
import { factory } from '../factory.js';

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
        return factory.createHandlers(zValidator('json', loginValidationSchema), async (c) => {
            try {
                // Validates request body
                const { email, password } = c.req.valid('json');
                // Gets access token
                const accessToken = await this.authService.login(email, password);

                return c.json(accessToken, 200);
            } catch (err) {
                console.error(err);

                if (err instanceof AppError) {
                    throw new HTTPException(err.statusCode, { message: err.message });
                }

                throw err;
            }
        });
    }

    register() {
        return factory.createHandlers(zValidator('json', registerValidationSchema), async (c) => {
            try {
                // Validates request body
                const { firstName, lastName, email, password } = c.req.valid('json');
                // Gets access token
                const accessToken = await this.authService.register(
                    firstName,
                    lastName,
                    email,
                    password,
                );

                return c.json(accessToken, 201);
            } catch (err) {
                console.error(err);

                if (err instanceof AppError) {
                    throw new HTTPException(err.statusCode, { message: err.message });
                }

                throw err;
            }
        });
    }
}
