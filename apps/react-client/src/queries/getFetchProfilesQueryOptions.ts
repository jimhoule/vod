import { queryOptions } from '@tanstack/react-query';
import { fetchProfiles } from '../api/profilesApi';

export function getFetchProfilesQueryOptions(userId: string) {
	return queryOptions({
		queryKey: ['profiles'],
		queryFn: () => fetchProfiles(userId),
	});
}
