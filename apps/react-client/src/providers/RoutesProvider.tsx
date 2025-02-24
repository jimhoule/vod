import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import type { AuthContextType } from '../contexts/AuthContext';
import type { ProfileContextType } from '../contexts/ProfileContext';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: {} as AuthContextType,
		profile: {} as ProfileContextType,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function RoutesProvider() {
	const auth = useAuth();
	const profile = useProfile();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{ auth, profile }} />
		</QueryClientProvider>
	);
}
