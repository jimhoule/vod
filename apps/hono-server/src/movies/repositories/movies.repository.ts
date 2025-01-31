import type { Movie } from '../models/movie.model.js';
import type { CreateMovieData } from './types/create-movie-data.type.js';
import type { UpdateMovieData } from './types/update-movie-data.type.js';

export interface MoviesRepository {
	findAll(): Promise<Movie[]>;
	findById(id: string): Promise<Movie | undefined>;
	create(createMovieData: CreateMovieData): Promise<Movie>;
	update(id: string, updateMovieData: UpdateMovieData): Promise<Movie>;
	delete(id: Movie['id']): Promise<Movie>;
}
