import type { Movie } from '../../models/movie.model';

export type UpdateMoviePayload = Partial<Omit<Movie, 'id'>>;
