type TileImageProps = {
	className: string;
	src: string;
	alt: string;
};

export function TileImage({ className = '', src, alt = '' }: TileImageProps) {
	const imgClassName = `w-full h-3/4 object-cover ${className}`;

	return <img className={imgClassName} src={src} alt={alt} />;
}
