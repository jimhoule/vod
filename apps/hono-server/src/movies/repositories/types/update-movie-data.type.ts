import type { Movie } from '../../models/movie.model';

export type UpdateMovieData = Partial<Omit<Movie, 'id'>>;
