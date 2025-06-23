'use client';

import React from 'react';
import MobileMenu from './MobileMenu';

import type { AntdMenuItem } from '@/lib/types/Menu';

interface Props {
	menuItems: AntdMenuItem[];
}

const NavbarMobileClient: React.FC<Props> = ({ menuItems }) => {
	return <MobileMenu menuItems={menuItems} />;
};

export default NavbarMobileClient;
