import type { Movie } from '../models/movie.model.js';

export interface MoviesRepository {
	create(movie: Movie): Promise<Movie>;
	findAll(): Promise<Movie[]>;
	findById(id: string): Promise<Movie | undefined>;
}
