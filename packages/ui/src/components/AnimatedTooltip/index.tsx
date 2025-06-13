import { Tooltip, type TooltipProps } from '../Tooltip/index.js';

const animationsMap = {
	top: 'animate-fade-in-slide-down',
	bottom: 'animate-fade-in-slide-up',
	right: 'animate-fade-in-slide-left',
	left: 'animate-fade-in-slide-right',
};

type AnimatedTooltipAnimationSide = keyof typeof animationsMap;

type AnimatedTooltipProps = TooltipProps & {
	animationSide?: AnimatedTooltipAnimationSide;
};

export function AnimatedTooltip({ animationSide = 'top', ...tooltipProps }: AnimatedTooltipProps) {
	const animation = animationsMap[animationSide];

	if (!tooltipProps.contentProps) {
		tooltipProps.contentProps = { className: `${animation}` };
	} else {
		tooltipProps.contentProps.className = `${animation} ${tooltipProps.contentProps.className}`;
	}

	return <Tooltip {...tooltipProps} />;
}
