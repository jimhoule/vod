import { createContext } from 'react';
import { AccessTokenPayload } from '../api/authApi/types/AccessTokenPayload';

export type AuthContextType = {
	setAccessToken: (accessToken: string) => void;
	getAccessToken: () => string;
	removeAccessToken: () => void;
	getAccessTokenPayload: () => AccessTokenPayload;
	isAuthenticated: () => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
