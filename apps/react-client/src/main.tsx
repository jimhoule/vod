import '@repo/tailwind-config/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { RoutesProvider } from './providers/RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<RoutesProvider />
		</AuthProvider>
	</StrictMode>,
);
