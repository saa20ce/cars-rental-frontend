'use client';

import React from 'react';
import MobileMenu from '@/components/common/Header/MobileMenu';

import type { AntdMenuItem } from '@/lib/types/Menu';

interface Props {
	menuItems: AntdMenuItem[];
}

const NavbarMobileClient: React.FC<Props> = ({ menuItems }) => {
	const convertedMenuItems = menuItems.map((item) => ({
		key: item.key,
		label: item.label,
		children: item.children?.map((child) => child.label),
	}));

	return <MobileMenu menuItems={convertedMenuItems} />;
};

export default NavbarMobileClient;
