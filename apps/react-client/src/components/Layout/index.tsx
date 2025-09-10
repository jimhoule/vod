import { Link, Outlet } from '@tanstack/react-router';

const links = [
	{ to: '/profiles', label: 'Profiles' },
	{ to: '/movies', label: 'Movies' },
];

export function Layout() {
	return (
		<div className='h-full w-auto'>
			{/* Navbar */}
			<div className='grid h-[10%] w-auto grid-cols-2 grid-rows-1 bg-brand-bg-dark'>
				<div className='col-span-1 row-span-1 flex items-center justify-start gap-4 px-10'>
					{links.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className='flex items-center justify-center [&.active]:font-bold text-brand-text'
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>

			{/* Views */}
			<div className='h-[90%] w-auto'>
				<Outlet />
			</div>
		</div>
	);
}
