import { getCreateMovieValidationSchema } from '@packages/validations/movies/getCreateMovieValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateMovieValidationSchema } from '@packages/validations/movies/getUpdateMovieValidationSchema';
import { AppHttpError } from '@app/app.http-error';
import { createHandlers } from '@app/app.factory';
import { throwHttpError } from '@app/app.http-error';
import { validateZodSchema } from '@app/middlewares/validate-zod-schema.middleware';
import { isAuthenticated } from '@auth/middlewares/is-authenticated.middleware';
import { MoviesService } from '@movies/services/movies.service';

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
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
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
		const createMovieValidationSchema = getCreateMovieValidationSchema({
			titleErrorMessage: '* Invalid title',
			descriptionErrorMessage: '* Invalid description',
		});

		return createHandlers(
			isAuthenticated,
			validateZodSchema('json', createMovieValidationSchema),
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
		const idValidationSchema = getIdValidationSchema('* Invalid id');
		const updateMovieValidationSchema = getUpdateMovieValidationSchema({
			titleErrorMessage: '* Invalid title',
			descriptionErrorMessage: '* Invalid description',
		});

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			validateZodSchema('json', updateMovieValidationSchema),
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
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
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
