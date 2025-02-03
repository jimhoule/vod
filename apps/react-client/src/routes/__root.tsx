import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

type RootRouteContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: Root,
});

function Root() {
	return (
		<>
			<div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>

				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>

				<Link to="/profiles" className="[&.active]:font-bold">
					Profiles
				</Link>

				<Link
					to="/movies"
					search={{
						q: 'Movie A',
					}}
					className="[&.active]:font-bold"
				>
					Movies
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
