import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movies/')({
	component: MoviesPage,
	// Validates query params
	validateSearch: (search) => ({
		q: (search.q as string) || '',
	}),
	// Passes query params to loader
	loaderDeps: ({ search }) => ({
		q: search.q,
	}),
	loader: async ({ deps }) => {
		const movies = [
			{ id: 1, name: 'Movie A' },
			{ id: 2, name: 'Movie B' },
		];

		return {
			movies: movies.filter((movie) => movie.name.includes(deps.q)),
		};
	},
});

function MoviesPage() {
	const { q } = Route.useSearch();
	const { movies } = Route.useLoaderData();

	return (
		<>
			<h1>Movie with name including {q}</h1>
			<br />
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.name}</li>
				))}
			</ul>
		</>
	);
}
