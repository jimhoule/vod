import { useContext } from 'react';
import { ProfileContext, type ProfileContextType } from '../contexts/ProfileContext';

export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (!context) throw new Error('useProfile() must be used inside an ProfileProvider');

	return context;
};
