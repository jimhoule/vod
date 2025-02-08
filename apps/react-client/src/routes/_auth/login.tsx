import { type ChangeEvent, type FormEvent, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
});

const loginFormValidationSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

function LoginPage() {
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const loginMutation = useLoginMutation();

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setLoginForm({ ...loginForm, email: event.currentTarget.value });

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setLoginForm({ ...loginForm, password: event.currentTarget.value });

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const parsedLoginForm = loginFormValidationSchema.parse(loginForm);
		loginMutation.mutate(parsedLoginForm);
	};

	return (
		<div className="flex h-full w-auto items-center justify-center">
			<form
				className="grid h-1/2 w-1/4 grid-cols-1 grid-rows-3 rounded-xl border-4 border-cyan-300 bg-black p-4 opacity-80"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					name="email"
					placeholder="Enter email"
					value={loginForm.email}
					onChange={handleEmailChange}
				/>

				<input
					type="password"
					name="password"
					placeholder="Enter password"
					value={loginForm.password}
					onChange={handlePasswordChange}
				/>

				<input className="cursor-pointer bg-white p-2" type="submit" value="Login" />
			</form>
		</div>
	);
}
