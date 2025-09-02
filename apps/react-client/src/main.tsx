import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ProfileProvider } from './providers/ProfileProvider.tsx';
import { RoutesProvider } from './providers/RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<ProfileProvider>
				<RoutesProvider />
			</ProfileProvider>
		</AuthProvider>
	</StrictMode>,
);
