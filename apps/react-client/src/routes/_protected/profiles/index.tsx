import { createFileRoute, Link } from '@tanstack/react-router';
import { getFetchProfilesQueryOptions } from '../../../queries/getFetchProfilesQueryOptions';

export const Route = createFileRoute('/_protected/profiles/')({
	component: ProfilesPage,
	loader: async ({ context }) => {
		const profiles = await context.queryClient.ensureQueryData(
			getFetchProfilesQueryOptions('1'),
		);

		return { profiles };
	},
});

function ProfilesPage() {
	const { profiles } = Route.useLoaderData();

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
