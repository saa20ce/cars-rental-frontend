import React from 'react';
import { TopHeader } from '../common/Header/TopHeader';
import { Navbar } from '../common/Header/Navbar';

export const Header: React.FC = () => {
	return (
		<header>
			<div className='flex flex-col gap-3 mb-[14px] lg:gap-5'>
				<TopHeader />
				<Navbar />
			</div>
		</header>
	);
};
