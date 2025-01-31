import type { Movie } from '../models/movie.model.js';
import type { MoviesRepository } from './movies.repository.js';
import type { CreateMovieData } from './types/create-movie-data.type.js';
import type { UpdateMovieData } from './types/update-movie-data.type.js';

export class FakeMoviesRepository implements MoviesRepository {
	private movies: Movie[] = [];

	async findAll(): Promise<Movie[]> {
		return this.movies;
	}

	async findById(id: string): Promise<Movie | undefined> {
		return this.movies.find((movie: Movie): boolean => movie.id === id);
	}

	async create(createMovieData: CreateMovieData): Promise<Movie> {
		const movie = createMovieData;
		// NOTE: Creates a copy with a new reference
		this.movies.push(JSON.parse(JSON.stringify(movie)));

		return movie;
	}

	async update(id: string, updateMovieData: UpdateMovieData): Promise<Movie> {
		const movie = await this.findById(id);
		if (!movie) {
			throw new Error(`Movie with ID ${id} does not exist in database`);
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
