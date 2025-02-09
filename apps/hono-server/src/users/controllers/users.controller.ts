import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AppHttpError } from '../../app/app.http-error.js';
import { createHandlers } from '../../app/app.factory.js';
import { throwHttpError } from '../../app/app.http-error.js';
import { isAuthenticated } from '../../auth/middlewares/is-authenticated.middleware.js';
import { UsersService } from '../services/users.service.js';

const findByIdValidationSchema = z.object({
	id: z.string().uuid(),
});

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			try {
				const users = await this.usersService.findAll();

				return c.json(users, 200);
			} catch (err) {
				throwHttpError(err);
			}
		});
	}

	findById() {
		return createHandlers(
			isAuthenticated,
			zValidator('param', findByIdValidationSchema),
			async (c) => {
				try {
					const { id } = c.req.valid('param');
					const user = await this.usersService.findById(id);
					if (!user) {
						throw new AppHttpError(404, `User with ID ${id} not found`);
					}

					return c.json(user, 200);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}
}
