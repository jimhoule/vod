import { createFileRoute, Link } from '@tanstack/react-router';
import { fethProfiles } from '../../../queries/fetchProfiles';

export const Route = createFileRoute('/_protected/profiles/')({
	component: ProfilesPage,
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(fethProfiles('1'));
	},
});

function ProfilesPage() {
	const profiles = Route.useLoaderData();

	return (
		<div>
			{profiles.map((profile) => (
				<Link
					key={profile.id}
					to="/profiles/$id"
					params={{
						id: profile.id,
					}}
				>
					{profile.name}
				</Link>
			))}
		</div>
	);
}
