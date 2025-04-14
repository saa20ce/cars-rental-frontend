'use client';
import React, { useEffect, useState } from 'react';
import {
	LogoFull,
	PhoneIcon,
	MenuIcon,
	PhoneIconDefault,
} from '@/lib/ui/icons';
import { Menu, ConfigProvider, Button } from 'antd';
import type { WPMenuType } from '@/lib/types/Menu';
import { fetchMenuItems } from '@/lib/api/fetchCarMenu';
import { ChevronDownIcon } from '@/lib/ui/icons';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

type AntdMenuItem = {
	key: string;
	label: React.ReactNode;
	children?: AntdMenuItem[];
};

type WPMenuWithChildren = WPMenuType & { children: WPMenuWithChildren[] };

const buildMenuTree = (items: WPMenuType[]): WPMenuWithChildren[] => {
	const lookup: Record<number, WPMenuWithChildren> = {};
	const tree: WPMenuWithChildren[] = [];

	items.forEach((item) => {
		lookup[item.ID] = { ...item, children: [] };
	});

	items.forEach((item) => {
		const parentId = Number(item.menu_item_parent);
		if (parentId && lookup[parentId]) {
			lookup[parentId].children.push(lookup[item.ID]);
		} else {
			tree.push(lookup[item.ID]);
		}
	});

	return tree;
};

const convertToAntdMenuItems = (
	menuTree: WPMenuWithChildren[],
): AntdMenuItem[] => {
	return menuTree.map((item) => ({
		key: item.ID.toString(),
		label: item.title,
		children:
			item.children && item.children.length > 0
				? convertToAntdMenuItems(item.children)
				: undefined,
	}));
};

export const Navbar: React.FC = () => {
	const [menuItems, setMenuItems] = useState<AntdMenuItem[]>([]);

	useEffect(() => {
		async function loadMenu() {
			const data = await fetchMenuItems(
				`${WP_BASE_URL}/menu`,
			);
			if (data) {
				const tree = buildMenuTree(data);
				const antdItems = convertToAntdMenuItems(tree);
				setMenuItems(antdItems);
			}
		}
		loadMenu();
	}, []);

	return (
		<div className='flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full lg:py-[7px] lg:px-6 lg:rounded-3xl'>
			<LogoFull />

			<div className='flex items-center gap-6 lg:hidden'>
				<PhoneIcon />
				<MenuIcon />
			</div>

			<div className='hidden lg:flex w-[75%]'>
				<ConfigProvider
					theme={{
						components: {
							Menu: {
								itemBg: 'transparent',
								activeBarBorderWidth: 0,
								activeBarHeight: 0,
								lineWidth: 0,
								lineHeight: 0,
								groupTitleColor: '#fff',
								popupBg: '#284152',
								horizontalItemSelectedColor: '#f6f6f666',
								itemHoverBg: '#516573',
								itemActiveBg: '#516573',
								fontFamily: '"lato", "lato Fallback"',
								itemMarginBlock: 0,
								itemHeight: 36,
								itemBorderRadius: 8,
							},
						},
						token: {
							colorText: '#fff',
							fontSize: 16,
						},
					}}
				>
					<Menu
						mode='horizontal'
						items={menuItems}
						expandIcon={<ChevronDownIcon />}
						style={{ flex: 'auto', minWidth: 0, justifyContent: 'center' }}
					/>
				</ConfigProvider>
			</div>

			<div className='hidden lg:flex w-auto'>
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
						variant='outlined'
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
