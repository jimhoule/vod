import type { Movie } from '@packages/models/movies/Movie';

export type UpdateMoviePayload = Partial<Omit<Movie, 'id'>>;
