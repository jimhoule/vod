import { getCreateProfileValidationSchema } from '@packages/validations/profiles/getCreateProfileValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateProfileValidationSchema } from '@packages/validations/profiles/getUpdateProfileValidationSchema';
import { getUserIdValidationSchema } from '@packages/validations/common/getUserIdValidationSchema';
import { AppHttpError } from '@app/app.http-error';
import { createHandlers } from '@app/app.factory';
import { throwHttpError } from '@app/app.http-error';
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
				try {
					const { userId } = c.req.valid('param');
					const profiles = await this.profilesService.findAllByUserId(userId);

					return c.json(profiles, 200);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}

	findById() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				try {
					const { id } = c.req.valid('param');
					const profile = await this.profilesService.findById(id);
					if (!profile) {
						throw new AppHttpError(404, `Profile with ID ${id} not found`);
					}

					return c.json(profile, 200);
				} catch (err) {
					throwHttpError(err);
				}
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
				try {
					const createProfileDto = c.req.valid('json');
					const profile = await this.profilesService.create(createProfileDto);

					return c.json(profile, 201);
				} catch (err) {
					throwHttpError(err);
				}
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
				try {
					const { id } = c.req.valid('param');
					const updateProfileDto = c.req.valid('json');
					const profile = await this.profilesService.update(id, updateProfileDto);

					return c.json(profile, 200);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}

	delete() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				try {
					const { id } = c.req.valid('param');
					await this.profilesService.delete(id);

					return c.body(null, 204);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}
}
