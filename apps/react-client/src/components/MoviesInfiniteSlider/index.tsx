import { Slider } from '@repo/ui/components/Slider';
import { Movie } from '@repo/models/movies/Movie';
import { MoviesInfiniteSliderItem } from '../MoviesInfiniteSliderItem';

type MoviesSliderProps = {
	movies: Movie[];
	slideItemsCount: number;
};

export function MoviesInfiniteSlider({ movies, slideItemsCount }: MoviesSliderProps) {
	return (
		<Slider.Infinite
			items={movies}
			slideItemsCount={slideItemsCount}
			wasOneItemHoveredIdleTime={400}
		>
			<Slider.InfiniteIndicatorsContainer>
				{({ indicator, isCurrentSlide }) => {
					const opacity = !isCurrentSlide ? 'opacity-50' : '';

					return (
						<div
							key={indicator.index}
							className={`h-[4%] w-[1%] bg-white ${opacity}`}
						/>
					);
				}}
			</Slider.InfiniteIndicatorsContainer>

			<Slider.InfiniteFloatingControlsContainer>
				<Slider.InfiniteItemsContainer<Movie>>
					{({
						infinitItems,
						currentSlideIndex,
						wasOneItemHovered,
						wasOneItemHoveredIdleTime,
						setWasOneItemHovered,
						clearWasOneItemHovered,
					}) => {
						const handleMouseEnter = (): void => {
							setWasOneItemHovered(true);
						};

						const handleMouseLeave = (): void => {
							clearWasOneItemHovered(false);
						};

						return infinitItems.map((infinitItem: Movie, index: number) => (
							<MoviesInfiniteSliderItem
								key={index}
								movie={infinitItem}
								index={index}
								currentSlideIndex={currentSlideIndex}
								slideItemsCount={slideItemsCount}
								isHoveredIdleTime={wasOneItemHoveredIdleTime}
								canScale={wasOneItemHovered}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						));
					}}
				</Slider.InfiniteItemsContainer>
			</Slider.InfiniteFloatingControlsContainer>
		</Slider.Infinite>
	);
}
