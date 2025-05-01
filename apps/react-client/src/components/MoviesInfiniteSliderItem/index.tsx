import { useIdledState } from '@repo/ui/hooks/useIdledState';
import { Movie } from '@repo/models/movies/Movie';

type MoviesSliderItemProps = {
	movie: Movie;
	index: number;
	currentSlideIndex: number;
	slideItemsCount: number;
	isHoveredIdleTime: number;
	canScale: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};

export function MoviesInfiniteSliderItem({
	movie,
	index,
	currentSlideIndex,
	slideItemsCount,
	isHoveredIdleTime,
	canScale,
	onMouseEnter,
	onMouseLeave,
}: MoviesSliderItemProps) {
	const [isHovered, setIsHovered, clearIsHovered] = useIdledState(false, isHoveredIdleTime);

	const isCurrentSlideFirstMovie = index === currentSlideIndex * slideItemsCount;
	const isCurrentSlideLastMovie =
		index === currentSlideIndex * slideItemsCount + (slideItemsCount - 1);
	const transformOrigin = isCurrentSlideFirstMovie
		? 'origin-[0%_120%]'
		: isCurrentSlideLastMovie
			? 'origin-[100%_120%]'
			: 'origin-[50%_120%]';
	const scale = canScale ? 'hover:scale-150 hover:shadow-lg' : '';
	const display = isHovered ? 'block' : 'hidden';

	const handleMouseEnter = (): void => {
		setIsHovered(true);
		onMouseEnter();
	};

	const handleMouseLeave = (): void => {
		clearIsHovered(false);
		onMouseLeave();
	};

	return (
		<div key={movie.id} className={`box-border shrink-0 grow-0 basis-1/5 p-1`}>
			<div
				className={`size-full cursor-pointer transition-all duration-200 ease-in-out ${scale} ${transformOrigin}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<p className='size-full rounded-md bg-green-200'>{movie.title} image</p>

				<div className={`h-2/3 w-full rounded-b-md bg-gray-900 ${display}`}></div>
			</div>
		</div>
	);
}
