import type { SliderInfiniteContextType, Indicator } from './contexts/SliderInfiniteContext.js';
import { useSliderInfiniteContext } from './hooks/useSliderInfiniteContext.js';
import type { ChildlessHtmlDivElement } from '../../types/ChildlessHtmlDivElement.js';
import type { ChildrenFunction } from '../../types/ChildrenFunction.js';

type SliderInfiniteIndicatorsContainerProps<TItem> = ChildlessHtmlDivElement & {
	children: ChildrenFunction<
		SliderInfiniteContextType<TItem> & { indicator: Indicator; isCurrentSlide: boolean }
	>;
};

export function SliderInfiniteIndicatorsContainer<TItem>({
	children,
	className,
	...rest
}: SliderInfiniteIndicatorsContainerProps<TItem>) {
	const sliderInfiniteContext = useSliderInfiniteContext<TItem>();
	const {
		indicators,
		backwardSecretTranslationCheckpointIndex,
		forwardSecretTranslationCheckpointIndex,
		backwardSecretTranslationIndex,
		forwardSecretTranslationIndex,
		defaultCurrentSlideIndex,
		currentSlideIndex,
	} = sliderInfiniteContext;

	return (
		<div className={`flex h-1/5 w-full items-center justify-end gap-1 ${className}`} {...rest}>
			{indicators.map((indicator) => {
				const { index } = indicator;
				const isCurrentSlide =
					index === currentSlideIndex ||
					(index === backwardSecretTranslationCheckpointIndex &&
						currentSlideIndex === backwardSecretTranslationIndex) ||
					(index === defaultCurrentSlideIndex &&
						currentSlideIndex === forwardSecretTranslationCheckpointIndex) ||
					(index === defaultCurrentSlideIndex &&
						currentSlideIndex === forwardSecretTranslationIndex);

				return children({
					...sliderInfiniteContext,
					indicator,
					isCurrentSlide,
				});
			})}
		</div>
	);
}
