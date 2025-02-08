import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) return;

		throw redirect({
			to: '/profiles',
		});
	},
	component: () => <Outlet />,
});
