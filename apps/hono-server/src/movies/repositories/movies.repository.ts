import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMovieData } from './types/create-movie-data.type';
import type { UpdateMovieData } from './types/update-movie-data.type';

export interface MoviesRepository {
	findAll(): Promise<Movie[]>;
	findById(id: Movie['id']): Promise<Movie | undefined>;
	create(createMovieData: CreateMovieData): Promise<Movie>;
	update(id: Movie['id'], updateMovieData: UpdateMovieData): Promise<Movie>;
	delete(id: Movie['id']): Promise<Movie>;
}
