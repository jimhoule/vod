import { Field, type FieldRenderProps } from 'react-final-form';
import type { ChildrenFunction } from '../../types/ChildrenFunction.js';

type FormFieldProps = {
	children: ChildrenFunction<FieldRenderProps>;
	className?: string;
	name: string;
};

export function FormField({ children, className = '', name }: FormFieldProps) {
	return (
		<Field className={className} name={name}>
			{(props) => children(props)}
		</Field>
	);
}
