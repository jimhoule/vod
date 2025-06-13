import * as RadixTooltip from '@radix-ui/react-tooltip';
import { Children } from '../../types/Children.js';

type TooltipChildren = {
	trigger: Children;
	content: Children;
};

export type TooltipProps = Omit<RadixTooltip.TooltipProps, 'children'> & {
	children: TooltipChildren;
	contentProps?: RadixTooltip.TooltipContentProps;
	arrowProps?: RadixTooltip.TooltipArrowProps;
};

export function Tooltip({
	children,
	contentProps = {
		sideOffset: 5,
	},
	arrowProps = {
		width: 30,
		height: 15,
	},
	delayDuration = 0,
	...rootProps
}: TooltipProps) {
	const { className: contentClassName, ...restContentProps } = contentProps;
	const { className: arrowClassName, ...restArrowProps } = arrowProps;

	return (
		<RadixTooltip.Provider delayDuration={delayDuration}>
			<RadixTooltip.Root {...rootProps}>
				<RadixTooltip.Trigger asChild>{children.trigger}</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						className={`bg-white px-6 py-2 text-2xl font-semibold ${contentClassName}`}
						{...restContentProps}
					>
						{children.content}
						<RadixTooltip.Arrow
							className={`fill-white ${arrowClassName}`}
							{...restArrowProps}
						/>
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
}
