import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AppHttpError } from '../../app/app.http-error.js';
import { createHandlers } from '../../app/app.factory.js';
import { throwHttpError } from '../../app/app.http-error.js';
import { isAuthenticated } from '../../auth/middlewares/is-authenticated.middleware.js';
import { MoviesService } from '../services/movies.service.js';

const idValidationSchema = z.object({
	id: z.string().uuid(),
});

const createValidationSchema = z.object({
	title: z.string(),
	description: z.string(),
});

const updateValidationSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
});

export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

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
			zValidator('param', idValidationSchema),
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

	create() {
		return createHandlers(
			isAuthenticated,
			zValidator('json', createValidationSchema),
			async (c) => {
				try {
					const createMovieDto = c.req.valid('json');
					const movie = await this.moviesService.create(createMovieDto);

					return c.json(movie, 201);
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
					const updateMovieDto = c.req.valid('json');
					const movie = await this.moviesService.update(id, updateMovieDto);

					return c.json(movie, 200);
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
					await this.moviesService.delete(id);

					return c.body(null, 204);
				} catch (err) {
					throwHttpError(err);
				}
			},
		);
	}
}
