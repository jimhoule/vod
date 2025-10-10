import type { Either } from '@packages/core/types/Either';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export interface MoviesRepository {
	findAll(): Promise<Either<Movie[], InfrastructureError>>;
	findById(id: Movie['id']): Promise<Either<Movie | undefined, InfrastructureError>>;
	create(createMovieData: CreateMovieData): Promise<Either<Movie, InfrastructureError>>;
	update(
		id: Movie['id'],
		updateMovieData: UpdateMovieData,
	): Promise<Either<Movie, InfrastructureError>>;
	delete(id: Movie['id']): Promise<Either<Movie, InfrastructureError>>;
}
