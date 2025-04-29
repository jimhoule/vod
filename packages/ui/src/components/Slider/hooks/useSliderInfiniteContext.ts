import { useContext, type Context } from 'react';
import {
	SliderInfiniteContext,
	type SliderInfiniteContextType,
} from '../contexts/SliderInfiniteContext.js';

export function useSliderInfiniteContext<TItem>(): SliderInfiniteContextType<TItem> {
	const context = useContext<SliderInfiniteContextType<TItem>>(
		SliderInfiniteContext as Context<SliderInfiniteContextType<TItem>>,
	);
	if (!context)
		throw new Error('useSliderInfinite() must be used inside an SliderInfiniteProvider');

	return context;
}
