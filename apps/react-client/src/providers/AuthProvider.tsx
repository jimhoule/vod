import { PropsWithChildren } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../contexts/AuthContext';

const ACCESS_TOKEN_KEY = 'accessToken';

const setAccessToken = (accessToken: string): void =>
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);
const removeAccessToken = (): void => localStorage.removeItem(ACCESS_TOKEN_KEY);
const getAccessTokenPayload = () =>
	jwtDecode<{ id: string; email: string }>(getAccessToken() as string);
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
