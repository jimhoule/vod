import { PresentationError } from '@packages/errors/presentation/PresentationError';
import { getCreateMovieValidationSchema } from '@packages/validations/movies/getCreateMovieValidationSchema';
import { getIdValidationSchema } from '@packages/validations/common/getIdValidationSchema';
import { getUpdateMovieValidationSchema } from '@packages/validations/movies/getUpdateMovieValidationSchema';
import { createHandlers } from '@app/app.factory';
import { throwHttpError } from '@app/app.http-error';
import { validateZodSchema } from '@app/middlewares/validateZodSchema';
import { isAuthenticated } from '@auth/presentation/http/middlewares/isAuthenticated';
import { MoviesService } from '@movies/application/services/MoviesService';

export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	findAll() {
		return createHandlers(isAuthenticated, async (c) => {
			try {
				const [movies, error] = await this.moviesService.findAll();
				if (error) {
					const presentationError = new PresentationError(
						500,
						'MoviesController/findAll',
						'',
						error,
					);
					return c.json(presentationError, 500);
				}

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
					const [movie, error] = await this.moviesService.findById(id);
					if (error) {
						const presentationError = new PresentationError(
							500,
							'MoviesController/findById',
							'',
							error,
						);
						return c.json(presentationError, 500);
					}

					if (!movie) {
						const presentationError = new PresentationError(
							404,
							'MoviesController/findById',
							'Movie not found',
						);
						return c.json(presentationError, 404);
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
					const [movie, error] = await this.moviesService.create(createMovieDto);
					if (error) {
						const presentationError = new PresentationError(
							500,
							'MoviesController/findById',
							'',
							error,
						);
						return c.json(presentationError, 500);
					}

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
					const [movie, error] = await this.moviesService.update(id, updateMovieDto);
					if (error) {
						const presentationError = new PresentationError(
							500,
							'MoviesController/findById',
							'',
							error,
						);
						return c.json(presentationError, 500);
					}

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
