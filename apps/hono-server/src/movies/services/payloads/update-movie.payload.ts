import type { Movie } from '../../models/movie.model.js';

export type UpdateMoviePayload = Partial<Omit<Movie, 'id'>>;
