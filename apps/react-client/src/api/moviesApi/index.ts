import { Movie } from '@packages/models/movies/Movie';

export function fetchMovies(): Movie[] {
	return [
		{ id: '1', title: 'Movie A', description: 'Description A' },
		{ id: '2', title: 'Movie B', description: 'Description B' },
		{ id: '3', title: 'Movie C', description: 'Description C' },
		{ id: '4', title: 'Movie D', description: 'Description D' },
		{ id: '5', title: 'Movie E', description: 'Description E' },
		{ id: '6', title: 'Movie F', description: 'Description F' },
		{ id: '7', title: 'Movie G', description: 'Description G' },
		{ id: '8', title: 'Movie H', description: 'Description H' },
		{ id: '9', title: 'Movie I', description: 'Description I' },
		{ id: '10', title: 'Movie J', description: 'Description J' },
	];
}
