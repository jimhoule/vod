import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated()) return;

		throw redirect({
			to: '/login',
		});
	},
	component: () => <Outlet />,
});
