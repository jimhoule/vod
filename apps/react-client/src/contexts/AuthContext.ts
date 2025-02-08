import { createContext } from 'react';

export type AuthContextType = {
	setAccessToken: (accessToken: string) => void;
	getAccessToken: () => string | null;
	removeAccessToken: () => void;
	getAccessTokenPayload: () => { id: string; email: string };
	isAuthenticated: () => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
