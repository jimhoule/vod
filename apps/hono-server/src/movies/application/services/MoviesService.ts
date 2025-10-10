import type { Either } from '@packages/core/types/Either';
import { ApplicationError } from '@packages/errors/application/ApplicationError';
import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMoviePayload } from '@movies/application/services/payloads/CreateMoviePayload';
import type { UpdateMoviePayload } from '@movies/application/services/payloads/UpdateMoviePayload';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import type { UuidService } from '@uuid/application/services/UuidService';

export class MoviesService {
	constructor(
		private readonly moviesRepository: MoviesRepository,
		private readonly uuidService: UuidService,
	) {}

	async findAll(): Promise<Either<Movie[], ApplicationError>> {
		const [movies, error] = await this.moviesRepository.findAll();
		if (error) {
			const applicationError = new ApplicationError('MoviesService/findAll', '', error);
			return [null, applicationError];
		}

		return [movies, null];
	}

	async findById(id: Movie['id']): Promise<Either<Movie | undefined, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.findById(id);
		if (error) {
			const applicationError = new ApplicationError('MoviesService/findById', '', error);
			return [null, applicationError];
		}

		return [movie, null];
	}

	async create(createMoviePayload: CreateMoviePayload): Promise<Either<Movie, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.create({
			...createMoviePayload,
			id: this.uuidService.generate(),
		});
		if (error) {
			const applicationError = new ApplicationError('MoviesService/create', '', error);
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
			const applicationError = new ApplicationError('MoviesService/update', '', error);
			return [null, applicationError];
		}

		return [movie, null];
	}

	async delete(id: Movie['id']): Promise<Either<Movie, ApplicationError>> {
		const [movie, error] = await this.moviesRepository.delete(id);
		if (error) {
			const applicationError = new ApplicationError('MoviesService/delete', '', error);
			return [null, applicationError];
		}

		return [movie, null];
	}
}
