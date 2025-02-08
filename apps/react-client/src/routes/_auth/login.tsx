import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
});

function LoginPage() {
	return (
		<div className="flex h-full w-auto items-center justify-center">
			<div className="h-1/2 w-1/4 rounded-xl border-4 border-cyan-300 bg-black opacity-80"></div>
		</div>
	);
}
