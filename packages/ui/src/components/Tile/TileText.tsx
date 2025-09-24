import type { Children } from '../../types/Children.js';

type TileTextProps = {
	children: Children;
	containerClassName: string;
	textClassName: string;
};

export function TileText({ children, containerClassName = '', textClassName = '' }: TileTextProps) {
	const divClassName = `flex items-center justify-center h-1/4 ${containerClassName}`;
	const pClassName = `text-3xl text-white ${textClassName}`;

	return (
		<div className={divClassName}>
			<p className={pClassName}>{children}</p>
		</div>
	);
}
