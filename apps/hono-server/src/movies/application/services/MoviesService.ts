import type { Either } from '@packages/core/types/Either';
import type { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { ApplicationErrorMapper } from '@packages/errors/application/mappers/ApplicationErrorMapper';
import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMoviePayload } from '@movies/application/services/payloads/CreateMoviePayload';
import type { UpdateMoviePayload } from '@movies/application/services/payloads/UpdateMoviePayload';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import type { UuidService } from '@uuid/application/services/UuidService';

export class MoviesService {
	constructor(
		private readonly applicationErrorMapper: ApplicationErrorMapper,
		private readonly moviesRepository: MoviesRepository,
		private readonly uuidService: UuidService,
	) {}

	async findAll(): Promise<Either<Movie[], ApplicationError>> {
		const [movies, error] = await this.moviesRepository.findAll();
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/findAll',
				error,
			);
			return [null, applicationError];
		}

		return [movies, null];
	}

	async findById(id: Movie['id']): Promise<Either<Movie | undefined, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.findById(id);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/findById',
				error,
			);
			return [null, applicationError];
		}

		return [movie, null];
	}

	async create(createMoviePayload: CreateMoviePayload): Promise<Either<Movie, ApplicationError>> {
		const [uuid, generateUuidError] = this.uuidService.generate();
		if (generateUuidError) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/create',
				generateUuidError,
			);
			return [null, applicationError];
		}

		const [movie, createMovieError] = await this.moviesRepository.create({
			...createMoviePayload,
			id: uuid,
		});
		if (createMovieError) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/create',
				createMovieError,
			);
			return [null, applicationError];
		}

		return [movie, null];
	}

	async update(
		id: Movie['id'],
		updateMoviePayload: UpdateMoviePayload,
	): Promise<Either<Movie, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.update(id, updateMoviePayload);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/update',
				error,
			);
			return [null, applicationError];
		}

		return [movie, null];
	}

	async delete(id: Movie['id']): Promise<Either<Movie, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.delete(id);
		if (error) {
			const applicationError = this.applicationErrorMapper.toApplicationError(
				'MoviesService/delete',
				error,
			);
			return [null, applicationError];
		}

		return [movie, null];
	}
}
