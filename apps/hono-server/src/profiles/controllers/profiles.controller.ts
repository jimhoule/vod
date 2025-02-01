import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AppHttpError } from '../../app/app.http-error.js';
import { createHandlers } from '../../app/app.factory.js';
import { throwHttpError } from '../../app/app.http-error.js';
import { isAuthenticated } from '../../auth/middlewares/is-authenticated.middleware.js';
import { ProfilesService } from '../services/profiles.service.js';

const idValidationSchema = z.object({
	id: z.string().uuid(),
});

const userIddValidationSchema = z.object({
	userId: z.string().uuid(),
});

const createValidationSchema = z.object({
	name: z.string(),
	userId: z.string().uuid(),
});

const updateValidationSchema = z.object({
	name: z.string().optional(),
	userId: z.string().uuid().optional(),
});

export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	findAllByUserId() {
		return createHandlers(
			isAuthenticated,
			zValidator('param', userIddValidationSchema),
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
		return createHandlers(
			isAuthenticated,
			zValidator('param', idValidationSchema),
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
		return createHandlers(
			isAuthenticated,
			zValidator('json', createValidationSchema),
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
		return createHandlers(
			isAuthenticated,
			zValidator('param', idValidationSchema),
			zValidator('json', updateValidationSchema),
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
		return createHandlers(
			isAuthenticated,
			zValidator('param', idValidationSchema),
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
