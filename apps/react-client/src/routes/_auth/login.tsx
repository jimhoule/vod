import { createFileRoute } from '@tanstack/react-router';
import { Form, type FormInputProps } from '@packages/ui/components/Form';
import { getLoginValidationSchema } from '@packages/validations/auth/getLoginValidationSchema';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
});

function LoginPage() {
	const initialValues = {
		email: '',
		password: '',
	};

	const loginValidationSchema = getLoginValidationSchema({
		emailErrorMessage: '* Invalid email',
		passwordErrorMessage: '* Invalid password',
	});

	const loginMutation = useLoginMutation();

	const renderFormInput = (
		name: FormInputProps['name'],
		placeholder: FormInputProps['placeholder'],
		type: FormInputProps['type'],
	) => (
		<Form.Input
			className='h-16 w-3/4 rounded-md border-2 border-brand-border-muted bg-brand-bg-dark px-2 text-brand-text outline-none transition-all duration-200 ease-in-out focus:w-full focus:border-brand-border-highlighted'
			name={name}
			placeholder={placeholder}
			type={type}
		>
			{(name: FormInputProps['name']) => (
				<Form.Error className='w-3/4 mt-2 text-brand-alert-danger' name={name} />
			)}
		</Form.Input>
	);

	const handleSubmit = (values: typeof initialValues): void => {
		loginMutation.mutate(values);
	};

	return (
		<div className='flex h-full w-auto items-center justify-center'>
			<Form<typeof loginValidationSchema, typeof initialValues>
				className='grid grid-cols-1 grid-rows-1 grid-rows-7 h-1/2 w-1/4 rounded-md bg-brand-bg-dark p-4 opacity-80'
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={loginValidationSchema}
			>
				<div className='row-start-1 h-fit w-full'>
					<p className='text-center text-4xl text-brand-text'>Login</p>
				</div>

				<div className='row-start-2 row-span-2'>
					{renderFormInput('email', 'Enter email', 'text')}
				</div>

				<div className='row-start-4 row-span-2'>
					{renderFormInput('password', 'Enter password', 'password')}
				</div>

				<div className='flex justify-center row-start-6 row-span-'>
					<Form.Submit
						className='w-3/4 cursor-pointer rounded-md bg-brand-primary p-4 text-xl text-brand-text transition-all duration-200 ease-in-out hover:w-full hover:text-2xl'
						title='Login'
					/>
				</div>
			</Form>
		</div>
	);
}
