import { async } from '@packages/core/async';
import type { Either } from '@packages/core/types/Either';
import type { PostgresError } from '@packages/db/postgres';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { PostgresRepositoryInfrastructureErrorMapper } from '@packages/errors/infrastructure/repositories/mappers/PostgresRepositoryInfrastructureErrorMapper';
import type { Movie } from '@packages/models/movies/Movie';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import {
	findAllMovies,
	findMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
} from '@movies/infrastructure/repositories/postgres/queries';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export class PostgresMoviesRepository implements MoviesRepository {
	constructor(
		private readonly postgresRepositoryInfrastructureErrorMapper: PostgresRepositoryInfrastructureErrorMapper,
	) {}

	async findAll(): Promise<Either<Movie[], InfrastructureError>> {
		const [movies, error] = await async(findAllMovies());
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresMoviesRepository/findAll',
				);
			return [null, infrastructureError];
		}

		return [movies, null];
	}

	async findById(id: Movie['id']): Promise<Either<Movie | undefined, InfrastructureError>> {
		const [movie, error] = await async(findMovieById(id));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresMoviesRepository/findByid',
				);
			return [null, infrastructureError];
		}

		return [movie, null];
	}

	async create(createMovieData: CreateMovieData): Promise<Either<Movie, InfrastructureError>> {
		const [movie, error] = await async(createMovie(createMovieData));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresMoviesRepository/create',
				);
			return [null, infrastructureError];
		}

		return [movie, null];
	}

	async update(
		id: Movie['id'],
		updateMovieData: UpdateMovieData,
	): Promise<Either<Movie, InfrastructureError>> {
		const [movie, error] = await async(updateMovie(id, updateMovieData));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresMoviesRepository/update',
				);
			return [null, infrastructureError];
		}

		return [movie, null];
	}

	async delete(id: Movie['id']): Promise<Either<Movie, InfrastructureError>> {
		const [movie, error] = await async(deleteMovie(id));
		if (error) {
			const infrastructureError =
				this.postgresRepositoryInfrastructureErrorMapper.toInfrastructureError(
					error.cause as PostgresError,
					'PostgresMoviesRepository/delete',
				);
			return [null, infrastructureError];
		}

		return [movie, null];
	}
}
