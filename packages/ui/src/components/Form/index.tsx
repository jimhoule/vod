import type { ChangeEvent, FocusEvent, FormEvent, PropsWithChildren } from 'react';
import { gridColsClassesMap } from '../../utils/gridColsClassesMap.js';
import { gridColSpanClassesMap } from '../../utils/gridColSpanClassesMap.js';
import { gridColStartClassesMap } from '../../utils/gridColStartClassesMap.js';
import { gridRowsClassesMap } from '../../utils/gridRowsClassesMap.js';
import { gridRowSpanClassesMap } from '../../utils/gridRowSpanClassesMap.js';
import { gridRowStartClassesMap } from '../../utils/gridRowStartClassesMap.js';
import { textColorClassesMap } from '../../utils/textColorClassesMap.js';
import { textPositionClassesMap } from '../../utils/textPositionClassesMap.js';
import { textSizeClassesMap } from '../../utils/textSizeClassesMap.js';

type FormProps = PropsWithChildren & {
	rows?: keyof typeof gridRowsClassesMap;
	cols?: keyof typeof gridColsClassesMap;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, rows = 1, cols = 1, onSubmit }: FormProps) {
	const classNames = `grid h-1/2 w-1/4 ${gridColsClassesMap[cols]} ${gridRowsClassesMap[rows]} rounded-md bg-black p-4 opacity-80`;

	return (
		<form className={classNames} onSubmit={onSubmit}>
			{children}
		</form>
	);
}

type FormFieldProps = PropsWithChildren & {
	rowPosition?: keyof typeof gridRowStartClassesMap;
	colPosition?: keyof typeof gridColStartClassesMap;
	rowSpace?: keyof typeof gridRowSpanClassesMap;
	colSpace?: keyof typeof gridColSpanClassesMap;
};

Form.Field = function FormField({
	children,
	rowPosition = 1,
	colPosition = 1,
	rowSpace = 1,
	colSpace = 1,
}: FormFieldProps) {
	const classNames = `${gridRowStartClassesMap[rowPosition]} ${gridRowSpanClassesMap[rowSpace]} ${gridColStartClassesMap[colPosition]} ${gridColSpanClassesMap[colSpace]}`;

	return <div className={classNames}>{children}</div>;
};

type FormTitleProps = {
	text: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
	position?: 'center' | 'start';
	color?: 'white' | 'black';
};

Form.Title = function FormTitle({
	text,
	size = 'lg',
	position = 'center',
	color = 'white',
}: FormTitleProps) {
	const classNames = `${textPositionClassesMap[position]} ${textSizeClassesMap[size]} ${textColorClassesMap[color]}`;

	return (
		<div className='h-fit w-full'>
			<p className={classNames}>{text}</p>
		</div>
	);
};

type FormInputProps = {
	type: 'text' | 'password';
	name: string;
	placeholder?: string;
	value: string;
	error: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

Form.Input = function FormInput({
	type,
	name,
	placeholder,
	value,
	error,
	onChange,
	onBlur,
}: FormInputProps) {
	return (
		<div className='flex h-fit w-full flex-col items-center'>
			<input
				className='h-16 w-3/4 rounded-md border-2 border-cyan-300 bg-black px-2 text-white outline-none transition-all duration-200 ease-in-out focus:w-full focus:border-pink-500'
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>

			{!!error && (
				<div className='flex h-10 w-full flex-col items-center justify-center'>
					<p className='w-3/4 text-red-500'>{error}</p>
				</div>
			)}
		</div>
	);
};

type FormSubmitProps = {
	title: string;
	isDisabled: boolean;
};

Form.Submit = function FormSubmit({ title, isDisabled = false }: FormSubmitProps) {
	return (
		<div className='flex justify-center'>
			<input
				className='w-3/4 cursor-pointer rounded-md border-2 border-cyan-300 bg-black p-4 text-xl text-white transition-all duration-200 ease-in-out hover:w-full hover:border-pink-500 hover:bg-pink-500 hover:text-2xl'
				type='submit'
				value={title}
				disabled={isDisabled}
			/>
		</div>
	);
};
