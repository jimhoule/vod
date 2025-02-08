import { queryOptions } from '@tanstack/react-query';
import { fetchMovies } from '../api/moviesApi';

export function getFetchMoviesQueryOptions() {
	return queryOptions({
		queryKey: ['movies'],
		queryFn: fetchMovies,
	});
}
