import { createFileRoute } from '@tanstack/react-router';
import { MoviesInfiniteSlider } from '../../../components/MoviesInfiniteSlider';
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
		<div className='size-full overflow-x-hidden overflow-y-scroll'>
			<div className='mt-40 h-1/4 w-full'>
				<MoviesInfiniteSlider movies={movies} slideItemsCount={5} />
			</div>

			<div className='mt-40 h-1/4 w-full'>
				<MoviesInfiniteSlider movies={movies} slideItemsCount={5} />
			</div>

			<div className='mt-40 h-1/4 w-full'>
				<MoviesInfiniteSlider movies={movies} slideItemsCount={5} />
			</div>
		</div>
	);
}
