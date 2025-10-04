import type { Movie } from '@packages/models/movies/Movie';

export type UpdateMovieData = Partial<Omit<Movie, 'id'>>;
