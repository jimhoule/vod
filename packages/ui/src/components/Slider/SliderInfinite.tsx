import type { ChildlessHtmlDivElement } from '../../types/ChildlessHtmlDivElement.js';
import type { Children } from '../../types/Children.js';
import { SliderInfiniteProvider } from './providers/SliderInfiniteProvider.js';

type SliderInfiniteProps<TItem> = ChildlessHtmlDivElement & {
	children: Children;
	items: TItem[];
	slideItemsCount: number;
	wasOneItemHoveredIdleTime?: number;
};

export function SliderInfinite<TItem>({
	children,
	items,
	slideItemsCount,
	className = '',
	wasOneItemHoveredIdleTime = 300,
	...rest
}: SliderInfiniteProps<TItem>) {
	return (
		<SliderInfiniteProvider<TItem>
			items={items}
			slideItemsCount={slideItemsCount}
			wasOneItemHoveredIdleTime={wasOneItemHoveredIdleTime}
		>
			<div className={`flex size-full flex-col ${className}`} {...rest}>
				{children}
			</div>
		</SliderInfiniteProvider>
	);
}
