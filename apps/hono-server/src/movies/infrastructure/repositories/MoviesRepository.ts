import type { Movie } from '@packages/models/movies/Movie';
import type { CreateMovieData } from '@movies/infrastructure/repositories/types/CreateMovieData';
import type { UpdateMovieData } from '@movies/infrastructure/repositories/types/UpdateMovieData';

export interface MoviesRepository {
	findAll(): Promise<Movie[]>;
	findById(id: Movie['id']): Promise<Movie | undefined>;
	create(createMovieData: CreateMovieData): Promise<Movie>;
	update(id: Movie['id'], updateMovieData: UpdateMovieData): Promise<Movie>;
	delete(id: Movie['id']): Promise<Movie>;
}
