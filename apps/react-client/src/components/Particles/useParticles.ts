import { useEffect, useMemo, useState } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export const useParticles = () => {
	const [isInitialized, setIsInitialized] = useState(false);

	const initialize = async (): Promise<void> => {
		await initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		});

		setIsInitialized(true);
	};

	useEffect(() => {
		initialize();
	}, []);

	const options: ISourceOptions = useMemo(
		() => ({
			background: {
				color: {
					value: '#222222',
				},
			},
			fpsLimit: 120,
			interactivity: {
				events: {
					onClick: {
						enable: true,
						mode: 'push',
					},
					onHover: {
						enable: true,
						mode: 'repulse',
					},
				},
				modes: {
					push: {
						quantity: 4,
					},
					repulse: {
						distance: 200,
						duration: 0.4,
					},
				},
			},
			particles: {
				color: {
					value: '#ffffff',
				},
				links: {
					color: '#ffffff',
					distance: 150,
					enable: true,
					opacity: 0.5,
					width: 1,
				},
				move: {
					direction: MoveDirection.none,
					enable: true,
					outModes: {
						default: OutMode.out,
					},
					random: false,
					speed: 6,
					straight: false,
				},
				number: {
					density: {
						enable: true,
					},
					value: 80,
				},
				opacity: {
					value: 0.5,
				},
				shape: {
					type: 'circle',
				},
				size: {
					value: { min: 1, max: 5 },
				},
			},
			detectRetina: true,
		}),
		[],
	);

	return {
		isInitialized,
		options,
	};
};
