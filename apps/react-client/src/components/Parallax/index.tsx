// NOTE: This a component is still a work in progress
export function Parallax() {
	return (
		<div className='h-1/2 w-full'>
			{/* parallax effect */}
			<div className='bg-blank-img h-1/2 w-full bg-[length:100%_50%] bg-fixed bg-center bg-no-repeat' />

			{/* Element */}
			<div className='h-1/2 w-full bg-red-500 opacity-50' />
		</div>
	);
}
