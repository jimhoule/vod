import { useState } from 'react';
import { SliderInfiniteContext } from '../contexts/SliderInfiniteContext.js';
import { useIdledState } from '../../../hooks/useIdledState.js';
import type { Children } from '../../../types/Children.js';

type SliderInfiniteProviderProps<TItem> = {
	children: Children;
	items: TItem[];
	slideItemsCount: number;
	wasOneItemHoveredIdleTime: number;
};

export function SliderInfiniteProvider<TItem>({
	children,
	items,
	slideItemsCount,
	wasOneItemHoveredIdleTime,
}: SliderInfiniteProviderProps<TItem>) {
	const indicatorsCount = Math.ceil(items.length / slideItemsCount);
	const indicators = new Array(indicatorsCount).fill(null).map((_, index) => ({ index }));

	// Triples the size of the array for infinite slider effect
	const infinitItems = [...items, ...items, ...items];
	const infiniteSlidesCount = Math.ceil(infinitItems.length / slideItemsCount);
	const backwardSecretTranslationCheckpointIndex = 1;
	const forwardSecretTranslationCheckpointIndex = infiniteSlidesCount - 2;
	const backwardSecretTranslationIndex = backwardSecretTranslationCheckpointIndex + 2;
	const forwardSecretTranslationIndex = forwardSecretTranslationCheckpointIndex - 2;

	const defaultCurrentSlideIndex = 0;
	const [currentSlideIndex, setCurrentSlideIndex] = useState(defaultCurrentSlideIndex);
	const [wasOneItemHovered, setWasOneItemHovered, clearWasOneItemHovered] = useIdledState(
		false,
		wasOneItemHoveredIdleTime,
	);

	return (
		<SliderInfiniteContext.Provider
			value={{
				indicatorsCount,
				indicators,

				infinitItems,
				infiniteSlidesCount,
				backwardSecretTranslationCheckpointIndex,
				forwardSecretTranslationCheckpointIndex,
				backwardSecretTranslationIndex,
				forwardSecretTranslationIndex,

				defaultCurrentSlideIndex,
				currentSlideIndex,
				wasOneItemHovered,
				wasOneItemHoveredIdleTime,
				setCurrentSlideIndex,
				setWasOneItemHovered,
				clearWasOneItemHovered,
			}}
		>
			{children}
		</SliderInfiniteContext.Provider>
	);
}
