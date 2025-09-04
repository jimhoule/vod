import { useState } from 'react';
import { AnimatedTooltipedButton } from '../AnimatedTooltipedButton';
import { Icon } from '@packages/ui/components/Icon';

export function LikeButtons() {
	const [isHovered, setIsHovered] = useState(false);

	const transition = 'transition-all delay-200 duration-500 ease-in-out';

	const buttonsContainerExpand = isHovered ? 'w-[325%] opacity-100' : 'w-full opacity-0';
	const buttonGeneralStyles = 'absolute rounded-full bg-transparent p-1 hover:bg-black';
	const thumbDownButtonPosition = isHovered ? 'left-0' : 'left-1/2 -translate-x-1/2';
	const heartButtonPosition = isHovered ? 'right-0' : 'right-1/2 translate-x-1/2';

	return (
		<div className='relative'>
			<div
				className={`absolute left-1/2 top-1/2 z-10 flex h-full -translate-x-1/2 -translate-y-1/2 items-center justify-around rounded-full bg-green-400 px-12 ${transition} ${buttonsContainerExpand}`}
				onMouseEnter={(): void => {
					setIsHovered(true);
				}}
				onMouseLeave={(): void => {
					setIsHovered(false);
				}}
			>
				<AnimatedTooltipedButton
					buttonClassName={`z-30 ${buttonGeneralStyles} ${transition} ${thumbDownButtonPosition}`}
					tooltipContent="I don't like this"
					onClick={(): void => {
						alert("I don't like!");
					}}
				>
					<Icon name='outlined-hand-thumb-down' className='size-6 text-white' />
				</AnimatedTooltipedButton>

				<AnimatedTooltipedButton
					buttonClassName={`z-40 ${buttonGeneralStyles}`}
					tooltipContent='I like this'
					onClick={(): void => {
						alert('I like!');
					}}
				>
					<Icon name='outlined-hand-thumb-up' className='size-6 text-white' />
				</AnimatedTooltipedButton>

				<AnimatedTooltipedButton
					buttonClassName={`z-20 ${buttonGeneralStyles} ${transition} ${heartButtonPosition}`}
					tooltipContent='I love this'
					onClick={(): void => {
						alert('I love!');
					}}
				>
					<Icon name='outlined-heart' className='size-6 text-white' />
				</AnimatedTooltipedButton>
			</div>

			<button className='rounded-full border-2 border-solid border-green-700 bg-black p-2 hover:border-white'>
				<Icon name='outlined-hand-thumb-up' className='size-6 text-white' />
			</button>
		</div>
	);
}
