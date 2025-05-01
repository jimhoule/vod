import { Profile } from '@repo/models/profiles/Profile';
import { apiClient } from '../apiClient';

export async function fetchProfiles(userId: string, accessToken: string): Promise<Profile[]> {
	const response = await apiClient.profiles.all[':userId'].$get(
		{
			param: {
				userId,
			},
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	return (await response.json()) as Profile[];
}
