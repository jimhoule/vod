import type { AsyncResult } from '@packages/core/async';
import { InfrastructureError } from '@packages/errors/infrastructure/InfrastructureError';
import type { Movie } from '@packages/models/movies/Movie';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export class FakeMoviesRepository implements MoviesRepository {
	private movies: Movie[] = [];

	async findAll(): Promise<AsyncResult<Movie[], InfrastructureError>> {
		return [this.movies, null];
	}

	async findById(id: Movie['id']): Promise<AsyncResult<Movie | undefined, InfrastructureError>> {
		const movie = this.movies.find((movie: Movie): boolean => movie.id === id);

		return [movie, null];
	}

	async create(
		createMovieData: CreateMovieData,
	): Promise<AsyncResult<Movie, InfrastructureError>> {
		const movie = createMovieData;
		// NOTE: Creates a copy with a new reference
		this.movies.push(JSON.parse(JSON.stringify(movie)));

		return [movie, null];
	}

	async update(
		id: Movie['id'],
		updateMovieData: UpdateMovieData,
	): Promise<AsyncResult<Movie, InfrastructureError>> {
		const [movie, error] = await this.findById(id);
		if (error) {
			return [null, error];
		}

		Object.assign(movie as Movie, updateMovieData);

		return [movie as Movie, null];
	}

	async delete(id: Movie['id']): Promise<AsyncResult<Movie, InfrastructureError>> {
		const [movie, error] = await this.findById(id);
		if (error) {
			return [null, error];
		}

		this.movies = this.movies.filter((movie: Movie): boolean => movie.id !== id);

		return [movie as Movie, null];
	}
}
