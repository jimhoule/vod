import {
	ChevronDownIcon as OutlinedChevronDownIcon,
	HandThumbDownIcon as OutlinedHandThumbDownIcon,
	HandThumbUpIcon as OutlinedHandThumbUpIcon,
	HeartIcon as OutlinedHeartIcon,
} from '@heroicons/react/24/outline';
import {
	ChevronDownIcon as SolidChevronDownIcon,
	HeartIcon as SolidHeartIcon,
	PlayIcon as SolidPlayIcon,
	PlusIcon as SolidPlusIcon,
} from '@heroicons/react/24/solid';

type IconName =
	| 'outlined-chevron-down'
	| 'outlined-hand-thumb-down'
	| 'outlined-hand-thumb-up'
	| 'outlined-heart'
	| 'solid-chevron-down'
	| 'solid-heart'
	| 'solid-play'
	| 'solid-plus';
type IconCompnentsMap = {
	[key in IconName]: typeof SolidPlayIcon;
};

const iconComponentsMap: IconCompnentsMap = {
	'outlined-chevron-down': OutlinedChevronDownIcon,
	'outlined-heart': OutlinedHeartIcon,
	'outlined-hand-thumb-down': OutlinedHandThumbDownIcon,
	'outlined-hand-thumb-up': OutlinedHandThumbUpIcon,

	'solid-chevron-down': SolidChevronDownIcon,
	'solid-heart': SolidHeartIcon,
	'solid-play': SolidPlayIcon,
	'solid-plus': SolidPlusIcon,
};

type IconProps = {
	name: IconName;
	className: string;
};

export function Icon({ name, className }: IconProps) {
	const IconComponent = iconComponentsMap[name];

	return IconComponent ? <IconComponent className={className} /> : null;
}
