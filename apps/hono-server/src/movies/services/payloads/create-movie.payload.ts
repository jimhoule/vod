import type { Movie } from '../../models/movie.model';

export type CreateMoviePayload = Omit<Movie, 'id'>;
