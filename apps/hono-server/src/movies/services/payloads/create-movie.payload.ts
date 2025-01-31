import type { Movie } from '../../models/movie.model.js';

export type CreateMoviePayload = Omit<Movie, 'id'>;
