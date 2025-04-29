import { createContext } from 'react';

export type Indicator = { index: number };

export type SliderInfiniteContextType<TItem = unknown> = {
	indicatorsCount: number;
	indicators: Indicator[];

	infinitItems: TItem[];
	infiniteSlidesCount: number;
	backwardSecretTranslationCheckpointIndex: number;
	forwardSecretTranslationCheckpointIndex: number;
	backwardSecretTranslationIndex: number;
	forwardSecretTranslationIndex: number;

	defaultCurrentSlideIndex: number;
	currentSlideIndex: number;
	wasOneItemHovered: boolean;
	wasOneItemHoveredIdleTime: number;
	setCurrentSlideIndex: (value: number) => void;
	setWasOneItemHovered: (value: boolean) => void;
	clearWasOneItemHovered: (value: boolean) => void;
};

export const SliderInfiniteContext = createContext<SliderInfiniteContextType | undefined>(
	undefined,
);
