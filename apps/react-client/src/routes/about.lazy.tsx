import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
	component: AboutPage,
});

function AboutPage() {
	return <div>About!</div>;
}
