import { PresentationError } from '@packages/errors/presentation/PresentationError';
import { getCreateProfileValidationSchema } from '@packages/validations/profiles/getCreateProfileValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateProfileValidationSchema } from '@packages/validations/profiles/getUpdateProfileValidationSchema';
import { getUserIdValidationSchema } from '@packages/validations/common/getUserIdValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { ProfilesService } from '@profiles/application/services/ProfilesService';

export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	findAllByUserId() {
		const userIdValidationSchema = getUserIdValidationSchema('* Invalid user id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', userIdValidationSchema),
			async (c) => {
				const { userId } = c.req.valid('param');
				const [profiles, error] = await this.profilesService.findAllByUserId(userId);
				if (error) {
					const presentationError = new PresentationError(
						500,
						'ProfilesController/findAllByUserId',
						'',
						error,
					);
					return c.json(presentationError, 500);
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
					const presentationError = new PresentationError(
						500,
						'ProfilesController/findById',
						'',
						error,
					);
					return c.json(presentationError, 500);
				}

				if (!profile) {
					const presentationError = new PresentationError(
						404,
						'ProfilesController/findById',
						'Movie not found',
					);
					return c.json(presentationError, 404);
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
					const presentationError = new PresentationError(
						500,
						'ProfilesController/create',
						'',
						error,
					);
					return c.json(presentationError, 500);
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
					const presentationError = new PresentationError(
						500,
						'ProfilesController/create',
						'',
						error,
					);
					return c.json(presentationError, 500);
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
