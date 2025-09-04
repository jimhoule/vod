import { AnimatedTooltip } from '@packages/ui/components/AnimatedTooltip';
import type { Children } from '@packages/ui/types/Children';

type AnimatedTooltipedButtonProps = {
	buttonClassName: string;
	children: Children;
	tooltipContent: string;
	onClick: () => void;
};

export function AnimatedTooltipedButton({
	buttonClassName,
	children,
	tooltipContent,
	onClick,
}: AnimatedTooltipedButtonProps) {
	return (
		<AnimatedTooltip
			delayDuration={0}
			contentProps={{
				className: 'bg-white px-6 py-2 text-2xl font-semibold',
				sideOffset: 5,
			}}
			arrowProps={{
				className: 'fill-white',
				width: 30,
				height: 15,
			}}
		>
			{{
				content: tooltipContent,
				trigger: (
					<button className={buttonClassName} onClick={onClick}>
						{children}
					</button>
				),
			}}
		</AnimatedTooltip>
	);
}
