'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ConfigProvider, Breadcrumb } from 'antd';
import Link from 'next/link';
import { ChevronRightIcon } from '@/lib/ui/icons';

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export const Breadcrumbs: React.FC = () => {
	const pathname = usePathname();
	const segments = pathname.split('/').filter((segment) => segment);

	const [homeTitle, setHomeTitle] = useState<string>('Home');
	const [titles, setTitles] = useState<Record<string, string>>({});

	useEffect(() => {
		fetch(`${WP_BASE_URL}/pages?slug=home`)
			.then((res) => res.json())
			.then((data) => {
				if (
					Array.isArray(data) &&
					data.length > 0 &&
					data[0].title?.rendered
				) {
					setHomeTitle(data[0].title.rendered);
				}
			})
			.catch((err) =>
				console.error('Ошибка при получении домашней страницы:', err),
			);
	}, []);

	useEffect(() => {
		segments.forEach((segment, index) => {
			if (titles[segment]) return;

			if (segment === 'cars') {
				setTitles((prev) => ({ ...prev, [segment]: 'Автопарк' }));
				return;
			}

			let endpoint = `${WP_BASE_URL}/pages?slug=${segment}`;

			if (segments[0] === 'cars' && index === 1) {
				endpoint = `${WP_BASE_URL}/cars?slug=${segment}`;
			}

			fetch(endpoint)
				.then((res) => res.json())
				.then((data) => {
					if (Array.isArray(data) && data.length > 0) {
						let titleToSet: string | undefined;
						if (segments[0] === 'cars' && index === 1) {
							if (data[0].acf?.nazvanie_avto) {
								titleToSet = data[0].acf.nazvanie_avto;
							}
						}
						if (!titleToSet && data[0].title?.rendered) {
							titleToSet = data[0].title.rendered;
						}
						if (titleToSet) {
							setTitles((prev) => ({
								...prev,
								[segment]: titleToSet,
							}));
						}
					}
				})
				.catch((err) =>
					console.error(
						`Ошибка при получении страницы для slug "${segment}":`,
						err,
					),
				);
		});
	}, [segments, titles]);
	const homeItem =
		segments.length === 0
			? { title: <span className='font-bold' style={{ fontFamily: '"lato", "lato Fallback"' }}>{homeTitle}</span> }
			: { title: <Link href='/' style={{ fontFamily: '"lato", "lato Fallback"' }}>{homeTitle}</Link> };

	const segmentItems = segments.map((segment, index) => {
		const href = '/' + segments.slice(0, index + 1).join('/');
		const displayTitle =
			titles[segment] ||
			segment.charAt(0).toUpperCase() + segment.slice(1);
		if (index === segments.length - 1) {
			return {
				title: <span className='font-semibold' style={{ fontFamily: '"lato", "lato Fallback"' }}>{displayTitle}</span>,
			};
		}
		return { title: <Link href={href} style={{ fontFamily: '"lato", "lato Fallback"' }}>{displayTitle}</Link> };
	});

	const items = [homeItem, ...segmentItems];

	return (
		<ConfigProvider
			theme={{
				components: {
					Breadcrumb: {
						itemColor: '#f6f6f6',
						lastItemColor: '#f6f6f6',
						linkColor: '#f6f6f6',
						linkHoverColor: '#f6f6f6',
						// fontSize: 14,
						colorBgTextHover: '#1e384a',
					},
				},
			}}
		>
			<Breadcrumb
				items={items}
				className='bg-[#1e384a] pt-[7px] pb-[8px] px-5 rounded-full mb-6 text-sm lg:pt-[14px] lg:pb-[16px] lg:px-6 lg:text-base lg:mb-9'
				separator={<ChevronRightIcon />}
			/>
		</ConfigProvider>
	);
};
