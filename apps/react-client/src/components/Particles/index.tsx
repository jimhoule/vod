import TsParticles from '@tsparticles/react';
import { useParticles } from './useParticles';

export function Particles() {
	const { isInitialized, options } = useParticles();

	return (
		<div className="absolute left-1/2 top-1/2 -z-50">
			{isInitialized && <TsParticles id="tsparticles" options={options} />}
		</div>
	);
}
