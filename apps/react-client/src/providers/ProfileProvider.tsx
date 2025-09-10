import { type PropsWithChildren, useState } from 'react';
import { Profile } from '@packages/models/profiles/Profile';
import { ProfileContext } from '../contexts/ProfileContext';

export const ProfileProvider = ({ children }: PropsWithChildren) => {
	const [profile, setProfile] = useState<Pick<Profile, 'id'> | undefined>(undefined);

	const getProfile = (): Pick<Profile, 'id'> | undefined => profile;
	const addProfile = (profile: Pick<Profile, 'id'>): void => setProfile(profile);
	const removeProfile = (): void => setProfile(undefined);

	return (
		<ProfileContext.Provider
			value={{
				getProfile,
				addProfile,
				removeProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};
