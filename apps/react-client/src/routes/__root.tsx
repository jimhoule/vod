import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Particles } from '../components/Particles';
import type { AuthContextType } from '../contexts/AuthContext';

type RootRouteContext = {
	queryClient: QueryClient;
	auth: AuthContextType;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: Root,
});

function Root() {
	return (
		<div className="h-screen w-screen">
			<Outlet />

			<Particles />

			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</div>
	);
}
