export function fetchProfiles(userId: string) {
	const profiles = [
		{ id: '1', userId: '1', name: 'Profile 1' },
		{ id: '2', userId: '1', name: 'Profile 2' },
		{ id: '3', userId: '2', name: 'Profile 3' },
	];

	return profiles.filter((profile) => profile.userId === userId);
}
