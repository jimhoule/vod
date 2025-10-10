import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { NotFoundError } from '@packages/errors/presentation/http/NotFoundError';
import type { HttpPresentationErrorMapper } from '@packages/errors/presentation/http/mappers/HttpPresentationErrorMapper';
import { getCreateProfileValidationSchema } from '@packages/validations/profiles/getCreateProfileValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateProfileValidationSchema } from '@packages/validations/profiles/getUpdateProfileValidationSchema';
import { getUserIdValidationSchema } from '@packages/validations/common/getUserIdValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { ProfilesService } from '@profiles/application/services/ProfilesService';

export class ProfilesController {
	constructor(
		private readonly httpPresentationErrorMapper: HttpPresentationErrorMapper,
		private readonly profilesService: ProfilesService,
	) {}

	findAllByUserId() {
		const userIdValidationSchema = getUserIdValidationSchema('* Invalid user id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', userIdValidationSchema),
			async (c) => {
				const { userId } = c.req.valid('param');
				const [profiles, error] = await this.profilesService.findAllByUserId(userId);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'ProfilesController/findAllByUserId',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(profiles, 200);
			},
		);
	}

	findById() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				const { id } = c.req.valid('param');
				const [profile, error] = await this.profilesService.findById(id);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'ProfilesController/findById',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				if (!profile) {
					const presentationError = new NotFoundError(
						'ProfilesController/findById',
						'Movie not found',
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(profile, 200);
			},
		);
	}

	create() {
		const createProfileValidationSchema = getCreateProfileValidationSchema({
			nameErrorMessage: '* Invalid name',
			userIdErrorMessage: '* Invalid user id',
		});

		return createHandlers(
			isAuthenticated,
			validateZodSchema('json', createProfileValidationSchema),
			async (c) => {
				const createProfileDto = c.req.valid('json');
				const [profile, error] = await this.profilesService.create(createProfileDto);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'ProfilesController/create',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(profile, 201);
			},
		);
	}

	update() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');
		const updateProfileValidationSchema = getUpdateProfileValidationSchema({
			nameErrorMessage: '* Invalid name',
		});

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			validateZodSchema('json', updateProfileValidationSchema),
			async (c) => {
				const { id } = c.req.valid('param');
				const updateProfileDto = c.req.valid('json');
				const [profile, error] = await this.profilesService.update(id, updateProfileDto);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'ProfilesController/update',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(profile, 200);
			},
		);
	}

	delete() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				const { id } = c.req.valid('param');
				await this.profilesService.delete(id);

				return c.body(null, 204);
			},
		);
	}
}
