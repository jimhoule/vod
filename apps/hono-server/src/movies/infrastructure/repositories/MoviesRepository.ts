import type { AsyncResult } from '@packages/core/async';
import type { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export interface MoviesRepository {
	findAll(): Promise<AsyncResult<Movie[], InfrastructureError>>;
	findById(id: Movie['id']): Promise<AsyncResult<Movie | undefined, InfrastructureError>>;
	create(createMovieData: CreateMovieData): Promise<AsyncResult<Movie, InfrastructureError>>;
	update(
		id: Movie['id'],
		updateMovieData: UpdateMovieData,
	): Promise<AsyncResult<Movie, InfrastructureError>>;
	delete(id: Movie['id']): Promise<AsyncResult<Movie, InfrastructureError>>;
}
