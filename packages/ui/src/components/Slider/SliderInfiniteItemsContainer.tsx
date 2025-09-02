import { useRef } from 'react';
import type { SliderInfiniteContextType } from './contexts/SliderInfiniteContext.js';
import { useSliderInfiniteContext } from './hooks/useSliderInfiniteContext.js';
import type { ChildlessHtmlDivElement } from '../../types/ChildlessHtmlDivElement.js';
import type { ChildrenFunction } from '../../types/ChildrenFunction.js';

const translateXMap: { [key: number]: string } = {
	0: 'translate-x-[calc(0*-100%)]',
	1: 'translate-x-[calc(1*-100%)]',
	2: 'translate-x-[calc(2*-100%)]',
	3: 'translate-x-[calc(3*-100%)]',
	4: 'translate-x-[calc(4*-100%)]',
};

type SliderInfiniteItemsContainerProps<TItem> = Omit<ChildlessHtmlDivElement, 'onTransitionEnd'> & {
	children: ChildrenFunction<SliderInfiniteContextType<TItem>>;
};

export function SliderInfiniteItemsContainer<TItem>({
	children,
	className = '',
	...rest
}: SliderInfiniteItemsContainerProps<TItem>) {
	const sliderInfiniteContext = useSliderInfiniteContext<TItem>();
	const {
		backwardSecretTranslationCheckpointIndex,
		forwardSecretTranslationCheckpointIndex,
		backwardSecretTranslationIndex,
		forwardSecretTranslationIndex,
		currentSlideIndex,
		setCurrentSlideIndex,
	} = sliderInfiniteContext;

	const itemsContainerRef = useRef<HTMLDivElement | null>(null);

	const translateSecretly = (slideIndex: number): void => {
		if (!itemsContainerRef?.current) return;

		itemsContainerRef.current.className = `flex h-full w-[90%] ${translateXMap[slideIndex]} ${className}`;
		setCurrentSlideIndex(slideIndex);
	};

	const handleTransitionEnd = () => {
		if (currentSlideIndex === forwardSecretTranslationCheckpointIndex) {
			// Translates 2 slides backward without transition so it cannot be seen
			translateSecretly(forwardSecretTranslationIndex);
			return;
		}

		if (currentSlideIndex === backwardSecretTranslationCheckpointIndex) {
			// Translates 2 slides forward without transition so it cannot be seen
			translateSecretly(backwardSecretTranslationIndex);
			return;
		}
	};

	return (
		<div
			ref={itemsContainerRef}
			className={`flex h-full w-[90%] ${translateXMap[currentSlideIndex]} transition-all duration-200 ease-in-out ${className}`}
			onTransitionEnd={handleTransitionEnd}
			{...rest}
		>
			{children(sliderInfiniteContext)}
		</div>
	);
}
