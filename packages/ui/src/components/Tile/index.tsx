import type { MouseEvent, PropsWithChildren } from 'react';
import { heightClassesMap } from '../../utils/heightClassesMap.js';
import { textColorClassesMap } from '../../utils/textColorClassesMap.js';
import { textSizeClassesMap } from '../../utils/textSizeClassesMap.js';
import { widthtClassesMap } from '../../utils/widthClassesMap.js';

type TileProps = PropsWithChildren & {
	id?: string;
	height: '32' | '48' | '64';
	width: '32' | '48' | '64';
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function Tile({ children, id = '', height, width, onClick }: TileProps) {
	const classNames = `${heightClassesMap[height]} ${widthtClassesMap[width]} cursor-pointer`;

	return (
		<div id={id} className={classNames} onClick={onClick}>
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
	const classNames = `${heightClassesMap[height]} ${widthtClassesMap[width]} object-cover`;

	return <img className={classNames} src={src} alt={alt} />;
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
	const divClassNames = `flex ${height} items-center justify-center`;
	const pClassNames = `${textSizeClassesMap[size]} ${textColorClassesMap[color]}`;

	return (
		<div className={divClassNames}>
			<p className={pClassNames}>{children}</p>
		</div>
	);
};
