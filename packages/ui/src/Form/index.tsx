import type { ChangeEvent, FocusEvent, FormEvent, PropsWithChildren } from 'react';

type FormProps = PropsWithChildren & {
	rows?: number;
	columns?: number;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, rows = 1, columns = 1, onSubmit }: FormProps) {
	const gridRows = `grid-rows-${rows}`;
	const gridCols = `grid-cols-${columns}`;

	return (
		<form
			className={`grid h-1/2 w-1/4 ${gridCols} ${gridRows} rounded-md bg-black p-4 opacity-80`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
}

type FormFieldProps = PropsWithChildren & {
	rowPosition?: number;
	columnPosition?: number;
	rowSpace?: number;
	columnSpace?: number;
};

Form.Field = function FormField({
	children,
	rowPosition = 1,
	columnPosition = 1,
	rowSpace = 1,
	columnSpace = 1,
}: FormFieldProps) {
	const rowStart = `row-start-${rowPosition}`;
	const rowSpan = `row-span-${rowSpace}`;
	const colStart = `col-start-${columnPosition}`;
	const colSpan = `col-span-${columnSpace}`;

	return <div className={`${rowStart} ${rowSpan} ${colStart} ${colSpan}`}>{children}</div>;
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
	const textSize = `text-${size}`;
	const textPosiion = `text-${position}`;
	const textColor = `text-${color}`;

	return (
		<div className="h-fit w-full">
			<p className={`${textPosiion} ${textSize} ${textColor}`}>{text}</p>
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
		<div className="flex h-fit w-full flex-col items-center">
			<input
				className="h-16 w-3/4 rounded-md border-2 border-cyan-300 bg-black px-2 text-white outline-none transition-all duration-200 ease-in-out focus:w-full focus:border-pink-500"
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>

			{!!error && (
				<div className="flex h-10 w-full flex-col items-center justify-center">
					<p className="w-3/4 text-red-500">{error}</p>
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
		<div className="flex justify-center">
			<input
				className="w-3/4 cursor-pointer rounded-md border-2 border-cyan-300 bg-black p-4 text-xl text-white transition-all duration-200 ease-in-out hover:w-full hover:border-pink-500 hover:bg-pink-500 hover:text-2xl"
				type="submit"
				value={title}
				disabled={isDisabled}
			/>
		</div>
	);
};
