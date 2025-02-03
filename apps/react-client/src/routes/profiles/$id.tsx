import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profiles/$id')({
	component: ProfilePage,
	loader: async ({ params }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return {
			id: params.id,
		};
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: () => <div>Error</div>,
});

function ProfilePage() {
	const { id } = Route.useLoaderData();

	return <div>Profile {id}</div>;
}
