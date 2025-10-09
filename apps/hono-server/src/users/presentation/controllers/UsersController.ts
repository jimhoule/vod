import { PresentationError } from '@packages/errors/presentation/PresentationError';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { UsersService } from '@users/application/services/UsersService';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			const [users, error] = await this.usersService.findAll();
			if (error) {
				const presentationError = new PresentationError(
					500,
					'UsersController/findAll',
					'',
					error,
				);

				return c.json(presentationError, 500);
			}

			return c.json(users, 200);
		});
	}

	findById() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				const { id } = c.req.valid('param');
				const [user, error] = await this.usersService.findById(id);
				if (error) {
					const presentationError = new PresentationError(
						500,
						'UsersController/findById',
						'',
						error,
					);

					return c.json(presentationError, 500);
				}

				if (!user) {
					const presentationError = new PresentationError(
						404,
						'UsersController/findById',
						'User not found',
					);

					return c.json(presentationError, 404);
				}

				return c.json(user, 200);
			},
		);
	}
}
