import React from 'react';
import type { WPMenuType, AntdMenuItem } from '@/lib/types/Menu';
import Link from 'next/link';

export type WPMenuWithChildren = WPMenuType & { children: WPMenuWithChildren[] };

export function buildMenuTree(items: WPMenuType[]): WPMenuWithChildren[] {
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
}

export function convertToAntdMenuItems(menuTree: WPMenuWithChildren[]): AntdMenuItem[] {
	return menuTree.map((item) => ({
		key: item.ID.toString(),
		label: (
			<Link href={item.url} >
				{item.title}
			</Link>
		),
		children:
			item.children && item.children.length > 0
				? convertToAntdMenuItems(item.children)
				: undefined,
	}));
}

