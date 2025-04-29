import type { SliderInfiniteContextType } from './contexts/SliderInfiniteContext.js';
import { useSliderInfiniteContext } from './hooks/useSliderInfiniteContext.js';
import type { ChildlessHtmlDivElement } from '../../types/ChildlessHtmlDivElement.js';
import type { CustomChildren } from '../../types/CustomChildren.js';
import { SliderControl } from './SliderControl.js';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

type SliderInfiniteFloatingControlsContainerProps<TItem> = Omit<
	ChildlessHtmlDivElement,
	'className'
> & {
	children: CustomChildren<SliderInfiniteContextType<TItem>>;
	containerClassName?: string;
	leftControlClassName?: string;
	rightControlClassName?: string;
};

export function SliderInfiniteFloatingControlsContainer<TItem>({
	children,
	containerClassName = '',
	leftControlClassName = '',
	rightControlClassName = '',
	...rest
}: SliderInfiniteFloatingControlsContainerProps<TItem>) {
	const sliderInfiniteContext = useSliderInfiniteContext<TItem>();
	const {
		backwardSecretTranslationCheckpointIndex,
		forwardSecretTranslationCheckpointIndex,
		defaultCurrentSlideIndex,
		currentSlideIndex,
		setCurrentSlideIndex,
	} = sliderInfiniteContext;

	// NOTE: Prevents de slide index from being an unwanted value when spamming the buttons
	const clampSlideIndex = (slideIndex: number) =>
		clamp(
			slideIndex,
			backwardSecretTranslationCheckpointIndex,
			forwardSecretTranslationCheckpointIndex,
		);

	const handleLeftControlClick = (): void => {
		setCurrentSlideIndex(clampSlideIndex(currentSlideIndex - 1));
	};

	const handleRightControlClick = (): void => {
		setCurrentSlideIndex(clampSlideIndex(currentSlideIndex + 1));
	};

	return (
		<div
			className={`relative flex h-4/5 w-full justify-center ${containerClassName}`}
			{...rest}
		>
			{currentSlideIndex !== defaultCurrentSlideIndex && (
				<SliderControl
					className={`absolute left-0 top-0 z-10 h-full w-[5%] bg-black text-white opacity-50 ${leftControlClassName}`}
					onClick={handleLeftControlClick}
				>
					ᐊ
				</SliderControl>
			)}

			{typeof children === 'function' ? children(sliderInfiniteContext) : children}

			<SliderControl
				className={`absolute right-0 top-0 z-10 h-full w-[5%] bg-black text-white opacity-50 ${rightControlClassName}`}
				onClick={handleRightControlClick}
			>
				ᐅ
			</SliderControl>
		</div>
	);
}
