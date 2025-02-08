import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../api/authApi';
import { useAuth } from './useAuth';

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { setAccessToken } = useAuth();

	return useMutation({
		mutationFn: (variables: { email: string; password: string }) => login(variables),
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			navigate({ to: '/profiles' });
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
