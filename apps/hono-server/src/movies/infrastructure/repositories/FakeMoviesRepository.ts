import type { Movie } from '@packages/models/movies/Movie';
import type { MoviesRepository } from '@movies/infrastructure/repositories/MoviesRepository';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export class FakeMoviesRepository implements MoviesRepository {
	private movies: Movie[] = [];

	async findAll(): Promise<Movie[]> {
		return this.movies;
	}

	async findById(id: Movie['id']): Promise<Movie | undefined> {
		return this.movies.find((movie: Movie): boolean => movie.id === id);
	}

	async create(createMovieData: CreateMovieData): Promise<Movie> {
		const movie = createMovieData;
		// NOTE: Creates a copy with a new reference
		this.movies.push(JSON.parse(JSON.stringify(movie)));

		return movie;
	}

	async update(id: Movie['id'], updateMovieData: UpdateMovieData): Promise<Movie> {
		const movie = await this.findById(id);
		if (!movie) {
			throw new Error(`Movie with ID ${id} does not exist`);
		}

		Object.assign(movie, updateMovieData);

		return movie;
	}

	async delete(id: Movie['id']): Promise<Movie> {
		const movie = await this.findById(id);
		this.movies = this.movies.filter((movie: Movie): boolean => movie.id !== id);

		return movie as Movie;
	}
}
