import type { Movie } from '@packages/models/movies/Movie';

export type CreateMoviePayload = Omit<Movie, 'id'>;
