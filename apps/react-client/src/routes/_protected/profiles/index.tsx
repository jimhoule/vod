import type { MouseEvent } from 'react';
import { Tile } from '@packages/ui/components/Tile';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import blankImage from '../../../../assets/blank.jpg';
import { useProfile } from '../../../hooks/useProfile';
import { getFetchProfilesQueryOptions } from '../../../queries/getFetchProfilesQueryOptions';

export const Route = createFileRoute('/_protected/profiles/')({
	component: ProfilesPage,
	loader: async ({ context }) => {
		const { getAccessToken, getAccessTokenPayload } = context.auth;
		const accessToken = getAccessToken();
		const { id } = getAccessTokenPayload();

		const profiles = await context.queryClient.ensureQueryData(
			getFetchProfilesQueryOptions(id, accessToken),
		);

		return { profiles };
	},
});

function ProfilesPage() {
	const { profiles } = Route.useLoaderData();

	const navigate = useNavigate();
	const { addProfile } = useProfile();

	const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
		addProfile({ id: event.currentTarget.id });
		navigate({ to: '/movies' });
	};

	return (
		<div className='flex h-full w-auto flex-col items-center justify-center'>
			<p className='mb-8 text-6xl text-white'>{"Who's watching ?"}</p>

			<div className='grid size-fit grid-cols-3 grid-rows-2 gap-12'>
				{profiles.map((profile) => (
					<Tile
						id={profile.id}
						key={profile.id}
						height='64'
						width='48'
						onClick={handleClick}
					>
						<Tile.Image height='3/4' width='full' src={blankImage} alt='blank' />

						<Tile.Text height='1/4' size='3xl' color='white'>
							{profile.name}
						</Tile.Text>
					</Tile>
				))}
			</div>
		</div>
	);
}
