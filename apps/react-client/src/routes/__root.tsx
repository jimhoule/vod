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

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/auth/login', label: 'Login' },
	{ to: '/profiles', label: 'Profiles' },
	{ to: '/movies', label: 'Movie' },
];

function Root() {
	return (
		<div className="flex h-screen w-screen bg-black p-5">
			{/* Navbar */}
			<div className="grid h-auto w-[17%] grid-cols-1 grid-rows-4 rounded-xl bg-cyan-500 opacity-50">
				{links.map((link) => (
					<Link
						key={link.to}
						to={link.to}
						className="flex items-center justify-center [&.active]:font-bold"
					>
						{link.label}
					</Link>
				))}
			</div>

			{/* Separator */}
			<div className="h-auto w-[3%]" />

			{/* Views */}
			<div className="h-auto w-4/5 rounded-xl bg-pink-500 opacity-50">
				<Outlet />
			</div>

			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</div>
	);
}
