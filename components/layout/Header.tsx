import React from 'react';
import { TopHeader } from '../common/Header/TopHeader';
import { Navbar } from '../common/Header/Navbar';
import Breadcrumbs from '../common/Header/Breadcrumbs';

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
