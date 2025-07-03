import React from 'react';
import { TopHeader } from '@/components/common/Header/TopHeader';
import { Navbar } from '@/components/common/Header/Navbar/Navbar';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';

export default async function Header() {
	return (
		<header>
			<div className="flex flex-col gap-3 mb-[12px] lg:gap-5 lg:mb-5">
				<TopHeader />
				<Navbar />
				<Breadcrumbs />
			</div>
		</header>
	);
}
