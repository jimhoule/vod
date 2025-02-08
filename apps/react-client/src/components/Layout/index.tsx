import { Link, Outlet } from '@tanstack/react-router';

const links = [
	{ to: '/profiles', label: 'Profiles' },
	{ to: '/movies', label: 'Movie' },
];

export function Layout() {
	return (
		<div className="flex h-full w-auto p-5">
			{/* Navbar */}
			<div className="grid h-auto w-1/5 grid-cols-1 grid-rows-4 rounded-xl bg-cyan-500 opacity-80">
				{links.map((link) => (
					<Link
						key={link.to}
						to={link.to}
						className="flex items-center justify-center [&.active]:font-bold"
					>
						{link.label}
					</Link>
				))}
			</div>

			{/* Views */}
			<div className="h-auto w-4/5 bg-pink-500 pl-[5%] opacity-50">
				<Outlet />
			</div>
		</div>
	);
}
