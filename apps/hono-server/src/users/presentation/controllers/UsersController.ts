import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { NotFoundError } from '@packages/errors/presentation/http/NotFoundError';
import type { HttpPresentationErrorMapper } from '@packages/errors/presentation/http/mappers/HttpPresentationErrorMapper';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { UsersService } from '@users/application/services/UsersService';

export class UsersController {
	constructor(
		private readonly httpPresentationErrorMapper: HttpPresentationErrorMapper,
		private readonly usersService: UsersService,
	) {}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			const [users, error] = await this.usersService.findAll();
			if (error) {
				const presentationError = this.httpPresentationErrorMapper.toPresentationError(
					'UsersController/findAll',
					error,
				);
				return c.json(presentationError, presentationError.status as ContentfulStatusCode);
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
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'UsersController/findById',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				if (!user) {
					const presentationError = new NotFoundError(
						'UsersController/findById',
						'User not found',
					);

					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(user, 200);
			},
		);
	}
}
