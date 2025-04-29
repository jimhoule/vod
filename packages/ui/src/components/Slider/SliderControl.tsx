import type { ButtonHTMLAttributes } from 'react';
import type { ChildlessHtmlAttributes } from '../../types/ChildlessHtmlAttributes.js';
import type { Children } from '../../types/Children.js';

type SliderControlProps = Pick<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'disabled' | 'name' | 'value'
> &
	ChildlessHtmlAttributes<HTMLButtonElement> & {
		children: Children;
	};

export function SliderControl({ children, ...rest }: SliderControlProps) {
	return (
		<button type='button' {...rest}>
			{children}
		</button>
	);
}
