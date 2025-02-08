import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import type { AuthContextType } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';

const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: {} as AuthContextType,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function RoutesProvider() {
	const auth = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{ auth }} />
		</QueryClientProvider>
	);
}
