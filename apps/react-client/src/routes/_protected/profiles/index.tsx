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
			<p className='mb-8 text-6xl text-brand-text'>{"Who's watching ?"}</p>

			<div className='grid size-fit grid-cols-3 grid-rows-2 gap-12'>
				{profiles.map((profile) => (
					<Tile
						className='w-48 h-64'
						id={profile.id}
						key={profile.id}
						onClick={handleClick}
					>
						<Tile.Image className='w-full h-3/4' src={blankImage} alt='blank' />

						<Tile.Text
							containerClassName='h-1/4'
							textClassName='text-3xl text-brand-text'
						>
							{profile.name}
						</Tile.Text>
					</Tile>
				))}
			</div>
		</div>
	);
}
