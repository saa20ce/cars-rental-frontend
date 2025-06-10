'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, ConfigProvider } from 'antd';
import { ChevronRightIcon } from '@/lib/ui/icons';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
	href: string;
	title: string;
	isLast: boolean;
}

const fetchBreadcrumbs = async (pathname: string) => {
	const res = await fetch(`/api/breadcrumbs?path=${encodeURIComponent(pathname)}`);
	return await res.json();
};

export default function Breadcrumbs() {
	const pathname = usePathname();
	const [items, setItems] = useState<BreadcrumbItem[]>([]);

	useEffect(() => {
		fetchBreadcrumbs(pathname).then(setItems);
	}, [pathname]);

	const mappedItems = items.map((item) => ({
		title: item.isLast
			? (
				<span
					className="font-semibold"
					style={{ fontFamily: '"lato", "lato Fallback"' }}
				>
					{item.title}
				</span>
			)
			: (
				<Link
					href={item.href}
					style={{ fontFamily: '"lato", "lato Fallback"' }}
				>
					{item.title}
				</Link>
			)
	}));

	return (
		<ConfigProvider
			theme={{
				components: {
					Breadcrumb: {
						itemColor: '#f6f6f6',
						lastItemColor: '#f6f6f6',
						linkColor: '#f6f6f6',
						linkHoverColor: '#f6f6f6',
						colorBgTextHover: '#1e384a',
					},
				},
			}}
		>
			<Breadcrumb
				items={mappedItems}
				className="bg-[#1e384a] pt-[7px] pb-[8px] px-5 rounded-full mb-6 text-sm lg:pt-[14px] lg:pb-[16px] lg:px-6 lg:text-base lg:mb-9"
				separator={<ChevronRightIcon />}
			/>
		</ConfigProvider>
	);
}
