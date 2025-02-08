import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../api/authApi';
import { LoginPayload } from '../api/authApi/types/LoginPayload';
import { useAuth } from './useAuth';

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { setAccessToken } = useAuth();

	return useMutation({
		mutationFn: (loginPayload: LoginPayload) => login(loginPayload),
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			navigate({ to: '/profiles' });
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
