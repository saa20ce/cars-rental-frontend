import React from 'react';
import { LogoFull, PhoneIcon, MenuIcon } from '@/lib/ui/icons';

export const Navbar: React.FC = () => {
	return (
		<div className='flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full'>
			<LogoFull />
			<div className='flex items-center gap-6'>
				<PhoneIcon />
				<MenuIcon />
			</div>
		</div>
	);
};
