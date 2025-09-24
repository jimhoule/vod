import { Form as InternalForm } from 'react-final-form';
import type { z } from 'zod';
import type { Children } from '../../types/Children.js';
import { FormError } from './FormError.js';
import { FormField } from './FormField.js';
import { FormInput } from './FormInput.js';
import { FormSubmit } from './FormSubmit.js';

type FormProps<TValidationSchema, TValues> = {
	children: Children;
	className?: string;
	initialValues: TValues;
	onSubmit: (values: TValues) => void;
	validationSchema: TValidationSchema;
};

export function Form<TValidationSchema extends z.ZodObject, TValues extends object>({
	children,
	className = '',
	initialValues,
	onSubmit,
	validationSchema,
}: FormProps<TValidationSchema, TValues>) {
	const validate = (values: TValues): Record<string, string> | object => {
		const { success, error } = validationSchema.safeParse(values);
		if (!success) {
			const keys = Object.keys(values);
			const errors = error.issues.reduce(
				(acc, issue, index) => ({
					...acc,
					[keys[index] as keyof typeof keys]: issue.message,
				}),
				initialValues,
			);

			return errors;
		}

		return {};
	};

	return (
		<InternalForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={validate}
			validateOnBlur
		>
			{({ handleSubmit }) => (
				<form className={className} onSubmit={handleSubmit}>
					{children}
				</form>
			)}
		</InternalForm>
	);
}

Form.Error = FormError;
Form.Field = FormField;
Form.Input = FormInput;
Form.Submit = FormSubmit;
