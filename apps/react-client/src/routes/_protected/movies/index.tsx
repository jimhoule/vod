import { createFileRoute } from '@tanstack/react-router';
import { getFetchMoviesQueryOptions } from '../../../queries/getFetchMoviesQueryOptions';

export const Route = createFileRoute('/_protected/movies/')({
	component: MoviesPage,
	loader: async ({ context }) => {
		const movies = await context.queryClient.ensureQueryData(getFetchMoviesQueryOptions());

		return { movies };
	},
});

function MoviesPage() {
	const { movies } = Route.useLoaderData();

	return (
		<div>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.name}</li>
				))}
			</ul>
		</div>
	);
}
