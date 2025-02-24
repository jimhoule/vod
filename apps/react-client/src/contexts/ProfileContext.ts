import { createContext } from 'react';
import { Profile } from '../api/profilesApi/types/Profile';

export type ProfileContextType = {
	getProfile: () => Pick<Profile, 'id'> | undefined;
	addProfile: (profile: Pick<Profile, 'id'>) => void;
	removeProfile: () => void;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
