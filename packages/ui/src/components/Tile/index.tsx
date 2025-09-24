import type { MouseEvent } from 'react';
import type { Children } from '../../types/Children.js';
import { TileImage } from './TileImage.js';
import { TileText } from './TileText.js';

type TileProps = {
	children: Children;
	className: string;
	id: string;
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function Tile({ children, className = '', id = '', onClick }: TileProps) {
	const divClassName = `w-32 h-48 cursor-pointer ${className}`;

	return (
		<div id={id} className={divClassName} onClick={onClick}>
			{children}
		</div>
	);
}

Tile.Image = TileImage;
Tile.Text = TileText;
