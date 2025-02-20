import type { MouseEvent, PropsWithChildren } from 'react';

type TileProps = PropsWithChildren & {
	id?: string;
	height: '32' | '48' | '64';
	width: '32' | '48' | '64';
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function Tile({ children, id = '', height, width, onClick }: TileProps) {
	const h = `h-${height}`;
	const w = `w-${width}`;

	return (
		<div id={id} className={`${h} ${w} cursor-pointer`} onClick={onClick}>
			{children}
		</div>
	);
}

type TileImageProps = {
	height?: '1/5' | '1/4' | '1/2' | '3/4' | '4/5' | 'full';
	width?: '1/5' | '1/4' | '1/2' | '3/4' | '4/5' | 'full';
	src: string;
	alt?: string;
};

Tile.Image = function TileImage({ height = '3/4', width = 'full', src, alt = '' }: TileImageProps) {
	const h = `h-${height}`;
	const w = `w-${width}`;

	return <img className={`${h} ${w}`} src={src} alt={alt} />;
};

type TileTextProps = PropsWithChildren & {
	height?: '1/5' | '1/4' | '1/2' | '3/4' | '4/5' | 'full';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
	color?: 'white' | 'black';
};

Tile.Text = function TileText({
	children,
	height = '1/4',
	size = '3xl',
	color = 'white',
}: TileTextProps) {
	const h = `h-${height}`;
	const textSize = `text-${size}`;
	const textColor = `text-${color}`;

	return (
		<div className={`flex ${h} items-center justify-center`}>
			<p className={`${textSize} ${textColor}`}>{children}</p>
		</div>
	);
};
