import { Movie } from '@packages/models/movies/Movie';
import { Icon } from '@packages/ui/components/Icon';
import { useIdledState } from '@packages/ui/hooks/useIdledState';
import { AnimatedTooltipedButton } from '../AnimatedTooltipedButton';
import { LikeButtons } from '../LikeButtons';

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
				<p className='size-full rounded-md bg-brand-secondary text-brand-text'>{movie.title} image</p>

				<div className={`h-3/4 w-full rounded-b-md bg-brand-bg p-4 ${display}`}>
					{/* Buttons */}
					<div className='flex h-1/2 w-full items-center'>
						{/* Left Buttons */}
						<div className='flex h-full w-1/2 items-center gap-1'>
							<button
								className='rounded-full bg-brand-bg-contrasted p-2'
								onClick={(): void => {
									alert('Play movie');
								}}
							>
								<Icon name='solid-play' className='size-6 text-brand-text-contrasted' />
							</button>

							<AnimatedTooltipedButton
								buttonClassName='rounded-full border-2 border-solid border-brand-border-muted bg-brand-bg-light p-2 hover:border-brand-border-highlighted'
								tooltipContent='Add to my list'
								onClick={(): void => {
									alert('adding to list');
								}}
							>
								<Icon name='solid-plus' className='size-6 text-brand-text' />
							</AnimatedTooltipedButton>

							<LikeButtons />
						</div>

						{/* Right Buttons */}
						<div className='flex h-full w-1/2 items-center justify-end'>
							<AnimatedTooltipedButton
								buttonClassName='rounded-full border-2 border-solid border-brand-border-muted bg-brand-bg-light p-2 hover:border-brand-border-highlighted'
								tooltipContent='More Info'
								onClick={(): void => {
									alert('Showing item details');
								}}
							>
								<Icon name='solid-chevron-down' className='size-6 text-brand-text' />
							</AnimatedTooltipedButton>
						</div>
					</div>

					{/* Description */}
					<div className='h-1/2 w-full bg-brand-primary' />
				</div>
			</div>
		</div>
	);
}
