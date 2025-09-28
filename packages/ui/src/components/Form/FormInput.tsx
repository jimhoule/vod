import { useField } from 'react-final-form';
import { ChildrenFunction } from '../../types/ChildrenFunction.js';

export type FormInputProps = {
	children?: ChildrenFunction<string>;
	className?: string;
	name: string;
	placeholder?: string;
	type: 'text' | 'password';
};

export function FormInput({
	children,
	className = '',
	name,
	placeholder = '',
	type,
}: FormInputProps) {
	const {
		input,
		meta: { error, touched },
	} = useField(name);

	return (
		<div className='flex h-fit w-full flex-col items-center'>
			<input {...input} className={className} type={type} placeholder={placeholder} />

			{!!children && !!error && touched && children(name)}
		</div>
	);
}
