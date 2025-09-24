import { createFileRoute } from '@tanstack/react-router';
import { Form } from '@packages/ui/components/Form';
import { z } from 'zod';
import { useLoginMutation } from '../../hooks/useLoginMutation';

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
});

const emailValidationSchema = z.email({ message: '* Invalid email' }).default('');
const passwordValidationSchema = z.string().min(1, { message: '* Invalid password' }).default('');
const loginFormValidationSchema = z.object({
	email: emailValidationSchema,
	password: passwordValidationSchema,
});

function LoginPage() {
	const initialValues = {
		email: '',
		password: '',
	};

	const loginMutation = useLoginMutation();

	const renderErrorComponent = (name: string) => (
		<Form.Error className='w-3/4 mt-2 text-red-500' name={name} />
	);

	const handleSubmit = (values: typeof initialValues): void => {
		loginMutation.mutate(values);
	};

	return (
		<div className='flex h-full w-auto items-center justify-center'>
			<Form<typeof loginFormValidationSchema, typeof initialValues>
				className='grid grid-cols-1 grid-rows-1 grid-rows-7 h-1/2 w-1/4 rounded-md bg-black p-4 opacity-80'
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={loginFormValidationSchema}
			>
				<div className='row-start-1 h-fit w-full'>
					<p className='text-center text-4xl text-brand-text'>Login</p>
				</div>

				<div className='row-start-2 row-span-2'>
					<Form.Input
						className='h-16 w-3/4 rounded-md border-2 border-cyan-300 bg-black px-2 text-white outline-none transition-all duration-200 ease-in-out focus:w-full focus:border-pink-500'
						type='text'
						name='email'
						placeholder='Enter email'
					>
						{renderErrorComponent}
					</Form.Input>
				</div>

				<div className='row-start-4 row-span-2'>
					<Form.Input
						className='h-16 w-3/4 rounded-md border-2 border-cyan-300 bg-black px-2 text-white outline-none transition-all duration-200 ease-in-out focus:w-full focus:border-pink-500'
						type='password'
						name='password'
						placeholder='Enter password'
					>
						{renderErrorComponent}
					</Form.Input>
				</div>

				<div className='flex justify-center row-start-6 row-span-'>
					<Form.Submit
						className='w-3/4 cursor-pointer rounded-md border-2 border-cyan-300 bg-black p-4 text-xl text-white transition-all duration-200 ease-in-out hover:w-full hover:border-pink-500 hover:bg-pink-500 hover:text-2xl'
						title='Login'
					/>
				</div>
			</Form>
		</div>
	);
}
