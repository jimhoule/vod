import { useFormState } from 'react-final-form';

type FormSubmitProps = {
	className?: string;
	title: string;
};

export function FormSubmit({ className = '', title }: FormSubmitProps) {
	const { invalid, pristine, submitting } = useFormState();
	const isDisabled = invalid || pristine || submitting;

	return <input className={className} type='submit' value={title} disabled={isDisabled} />;
}
