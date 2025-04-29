import type { SliderInfiniteContextType } from './contexts/SliderInfiniteContext.js';
import { useSliderInfiniteContext } from './hooks/useSliderInfiniteContext.js';
import type { ChildrenFunction } from '../../types/ChildrenFunction.js';

type SliderInfiniteContainerProps<TItem> = {
	children: ChildrenFunction<SliderInfiniteContextType<TItem>>;
};

export function SliderInfiniteContainer<TItem>({ children }: SliderInfiniteContainerProps<TItem>) {
	const sliderInfiniteContext = useSliderInfiniteContext<TItem>();

	return <>{children(sliderInfiniteContext)}</>;
}
