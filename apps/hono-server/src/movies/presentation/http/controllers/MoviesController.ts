import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { NotFoundError } from '@packages/errors/presentation/http/NotFoundError';
import type { HttpPresentationErrorMapper } from '@packages/errors/presentation/http/mappers/HttpPresentationErrorMapper';
import { getCreateMovieValidationSchema } from '@packages/validations/movies/getCreateMovieValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateMovieValidationSchema } from '@packages/validations/movies/getUpdateMovieValidationSchema';
import { createHandlers } from '@app/app.factory';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { MoviesService } from '@movies/application/services/MoviesService';

export class MoviesController {
	constructor(
		private readonly httpPresentationErrorMapper: HttpPresentationErrorMapper,
		private readonly moviesService: MoviesService,
	) {}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			const [movies, error] = await this.moviesService.findAll();
			if (error) {
				const presentationError = this.httpPresentationErrorMapper.toPresentationError(
					'MoviesController/findAll',
					'',
					error,
				);
				return c.json(presentationError, presentationError.status as ContentfulStatusCode);
			}

			return c.json(movies, 200);
		});
	}

	findById() {
		const idValidationSchema = getIdValidationSchema('* Invalid id');

		return createHandlers(
			isAuthenticated,
			validateZodSchema('param', idValidationSchema),
			async (c) => {
				const { id } = c.req.valid('param');
				const [movie, error] = await this.moviesService.findById(id);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'MoviesController/findById',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				if (!movie) {
					const presentationError = new NotFoundError(
						'MoviesController/findById',
						'Movie not found',
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(movie, 200);
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
				const createMovieDto = c.req.valid('json');
				const [movie, error] = await this.moviesService.create(createMovieDto);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'MoviesController/create',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(movie, 201);
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
				const { id } = c.req.valid('param');
				const updateMovieDto = c.req.valid('json');
				const [movie, error] = await this.moviesService.update(id, updateMovieDto);
				if (error) {
					const presentationError = this.httpPresentationErrorMapper.toPresentationError(
						'MoviesController/update',
						'',
						error,
					);
					return c.json(
						presentationError,
						presentationError.status as ContentfulStatusCode,
					);
				}

				return c.json(movie, 200);
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
				await this.moviesService.delete(id);

				return c.body(null, 204);
			},
		);
	}
}
