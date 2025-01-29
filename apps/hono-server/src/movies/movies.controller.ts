import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AppHttpError } from '../app/app.http-error.js';
import { createHandlers } from '../app/app.factory.js';
import { throwHttpError } from '../app/app.http-error.js';
import { isAuthenticated } from '../auth/middlewares/is-authenticated.middleware.js';
import { MoviesService } from './movies.service.js';

const createValidationSchema = z.object({
	title: z.string(),
	description: z.string(),
});

const findByIdValidationSchema = z.object({
	id: z.string().uuid(),
});

export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	create() {
		return createHandlers(
			isAuthenticated,
			zValidator('json', createValidationSchema),
			async (c) => {
				try {
					const { title, description } = c.req.valid('json');
					const movie = await this.moviesService.create(title, description);

					return c.json(movie, 201);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			try {
				const movies = await this.moviesService.findAll();

				return c.json(movies, 200);
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
					const movie = await this.moviesService.findById(id);
					if (!movie) {
						throw new AppHttpError(404, `Movie with ID ${id} not found`);
					}

					return c.json(movie, 200);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}
}
