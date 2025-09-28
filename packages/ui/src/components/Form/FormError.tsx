import { useField } from 'react-final-form';

export type FormErrorProps = {
	className?: string;
	name: string;
};

export function FormError({ className = '', name }: FormErrorProps) {
	const {
		meta: { error },
	} = useField(name);

	return <p className={className}>{error}</p>;
}
