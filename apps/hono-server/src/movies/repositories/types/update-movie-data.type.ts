import type { Movie } from '../../models/movie.model.js';

export type UpdateMovieData = Partial<Omit<Movie, 'id'>>;
