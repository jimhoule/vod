import { type ChangeEvent, type FocusEvent, type FormEvent, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Form } from '@repo/ui/Form';
import { z } from 'zod';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
});

const emailValidationSchema = z.string().email({ message: '* Invalid email' });
const passwordValidationSchema = z.string().min(1, { message: '* Invalid password' });
const loginFormValidationSchema = z.object({
	email: emailValidationSchema,
	password: passwordValidationSchema,
});

const initialState = {
	email: '',
	password: '',
};

function LoginPage() {
	const [loginInputs, setLoginInputs] = useState(initialState);
	const [loginErrors, setLoginErrors] = useState(initialState);

	const loginMutation = useLoginMutation();

	const validateInputValue = (
		name: string,
		parsedSchema: z.SafeParseReturnType<string, string>,
	): void => {
		const { success, error } = parsedSchema;

		if (!success) {
			setLoginErrors({
				...loginErrors,
				[name]: error.issues[0].message,
			});

			return;
		}

		setLoginErrors({
			...loginErrors,
			[name]: '',
		});
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setLoginInputs({ ...loginInputs, email: event.currentTarget.value });

	const handleEmailBlur = (event: FocusEvent<HTMLInputElement>): void => {
		const { name, value } = event.currentTarget;
		validateInputValue(name, emailValidationSchema.safeParse(value));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setLoginInputs({ ...loginInputs, password: event.currentTarget.value });

	const handlePasswordBlur = (event: FocusEvent<HTMLInputElement>): void => {
		const { name, value } = event.currentTarget;
		validateInputValue(name, passwordValidationSchema.safeParse(value));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const { data, success, error } = loginFormValidationSchema.safeParse(loginInputs);

		if (!success) {
			const keys = Object.keys(loginErrors);
			const errors = error.issues.reduce(
				(acc, issue, index) => ({
					...acc,
					[keys[index]]: issue.message,
				}),
				initialState,
			);

			setLoginErrors(errors);

			return;
		}

		setLoginErrors(initialState);
		loginMutation.mutate(data);
	};

	const isLoginButtonDisabled = Object.values(loginInputs).some((loginInput) => !loginInput);

	return (
		<div className="flex h-full w-auto items-center justify-center">
			<Form rows={7} onSubmit={handleSubmit}>
				<Form.Field rowPosition={1}>
					<Form.Title text="Login" size="4xl" position="center" color="white" />
				</Form.Field>

				<Form.Field rowPosition={2} rowSpace={2}>
					<Form.Input
						type="text"
						name="email"
						placeholder="Enter email"
						value={loginInputs.email}
						error={loginErrors.email}
						onChange={handleEmailChange}
						onBlur={handleEmailBlur}
					/>
				</Form.Field>

				<Form.Field rowPosition={4} rowSpace={2}>
					<Form.Input
						type="password"
						name="password"
						placeholder="Enter password"
						value={loginInputs.password}
						error={loginErrors.password}
						onChange={handlePasswordChange}
						onBlur={handlePasswordBlur}
					/>
				</Form.Field>

				<Form.Field rowPosition={6} rowSpace={2}>
					<Form.Submit title="Login" isDisabled={isLoginButtonDisabled} />
				</Form.Field>
			</Form>
		</div>
	);
}
