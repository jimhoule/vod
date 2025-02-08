import { PropsWithChildren } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AccessTokenPayload } from '../api/authApi/types/AccessTokenPayload';
import { AuthContext } from '../contexts/AuthContext';

const ACCESS_TOKEN_KEY = 'accessToken';

const setAccessToken = (accessToken: string): void =>
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
const getAccessToken = (): string => localStorage.getItem(ACCESS_TOKEN_KEY) as string;
const removeAccessToken = (): void => localStorage.removeItem(ACCESS_TOKEN_KEY);
const getAccessTokenPayload = () => jwtDecode<AccessTokenPayload>(getAccessToken());
const isAuthenticated = (): boolean => !!getAccessToken();

export const AuthProvider = ({ children }: PropsWithChildren) => (
	<AuthContext.Provider
		value={{
			setAccessToken,
			getAccessToken,
			removeAccessToken,
			getAccessTokenPayload,
			isAuthenticated,
		}}
	>
		{children}
	</AuthContext.Provider>
);
