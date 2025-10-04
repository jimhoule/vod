import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { AppHttpError } from '@app/app.http-error';
import { createHandlers } from '@app/app.factory';
import { throwHttpError } from '@app/app.http-error';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { UsersService } from '@users/application/services/UsersService';

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
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
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
