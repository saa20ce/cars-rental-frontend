import React from 'react';
import {
	LogoFull,
	PhoneIcon,
	PhoneIconDefault
} from '@/lib/ui/icons';
import Link from 'next/link';
import { ConfigProvider, Button } from 'antd';
import type { WPMenuType, AntdMenuItem } from '@/lib/types/Menu';
import { fetchMenuItems } from '@/lib/api/fetchMenu';
import { buildMenuTree, convertToAntdMenuItems } from '@/lib/helpers/menuHelpers';
import NavbarClient from './NavbarClient';
import NavbarMobileClient from './NavbarMobileClient';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export const Navbar = async () => {
	const data: WPMenuType[] | null = await fetchMenuItems(`${WP_API_URL}/menu`);
	
	let antdItems: AntdMenuItem[] = [];
	if (data) {
		const tree = buildMenuTree(data);
		antdItems = convertToAntdMenuItems(tree);
	}

	return (
		<div className="flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full lg:py-[7px] lg:px-6 lg:rounded-3xl">
			<Link href="/">
				<LogoFull />
			</Link>

			<div className="flex items-center gap-6 lg:hidden">
				<PhoneIcon />
				<NavbarMobileClient menuItems={antdItems} />
			</div>

			<div className="hidden lg:flex w-[75%]">
				<NavbarClient menuItems={antdItems} />
			</div>

			<div className="hidden lg:flex w-auto">
				<ConfigProvider
					theme={{
						components: {
							Button: {
								contentFontSize: 16,
								defaultHoverBorderColor: '#fff',
								defaultHoverColor: '#fff',
								paddingInline: 12,
								paddingBlock: 8,
								lineHeight: 0,
								fontFamily: '"lato", "lato Fallback"',
							},
						},
					}}
				>
					<Button
						variant="outlined"
						icon={<PhoneIconDefault />}
						style={{ height: 40, width: 169 }}
						ghost
					>
						Заказать звонок
					</Button>
				</ConfigProvider>
			</div>
		</div>
	);
};
