import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
	component: LoginPage,
});

function LoginPage() {
	return <div className="h-full w-auto rounded-xl bg-blue-300">Login</div>;
}
