import '@repo/tailwind-config/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RoutesProvider } from './providers/RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RoutesProvider />
	</StrictMode>,
);
