'use client';

import React, { useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import { MenuIcon, LogoFull, SmallCross } from '@/lib/ui/icons';
import Link from 'next/link';

type MobileMenuProps = {
	menuItems: { key: string; label: React.ReactNode; children?: any[] }[];
};

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className='flex items-center'
				onClick={() => setOpen(true)}
				style={{ cursor: 'pointer' }}
			>
				<MenuIcon />
			</div>
			<ConfigProvider
				theme={{
					components: {
						Modal: {
							contentBg: "#00000000",
							boxShadow: 'none',
						},
					},
				}}
			>

				<Modal
					open={open}
					onCancel={() => setOpen(false)}
					footer={null}
					closeIcon={false}
					width="100vw"
					style={{
						top: -100,
						left: 0,
						margin: 0,
						padding: 0,
					}}
					styles={{
						mask: {
							backdropFilter: 'blur(30px)',
							WebkitBackdropFilter: 'blur(30px)',
						},
					}}
					centered
				>
					<div className='flex justify-end'>
						<SmallCross
							onClick={() => setOpen(false)}
							style={{ cursor: 'pointer' }}
							width={16}
							height={22}
						/>
					</div>

					<div className="flex flex-col gap-4 p-8 pb-0 h-full">
						{menuItems.map((item) => {
							let href = '#';
							let labelContent: React.ReactNode = '';

							if (typeof item.label === 'string') {
								labelContent = item.label;
								href = typeof item.key === 'string' ? item.key : '#';
							} else if (React.isValidElement(item.label) && item.label.type === 'a') {
								// @ts-ignore
								href = item.label.props.href || '#';
								// @ts-ignore
								labelContent = item.label.props.children;
							} else {
								labelContent = item.label;
							}

							return (
								<Link
									key={item.key}
									href={href}
									onClick={() => setOpen(false)}
									className='text-white text-xl py-2 text-center'
									style={{ textDecoration: 'none' }}
								>
									{labelContent}
								</Link>
							);
						})}
					</div>

					<div className='flex justify-center mt-11'>
						<div className='h-[1px] bg-[#fff] w-[174px]' />
					</div>

					<div className='flex justify-center mt-9'>
						<LogoFull width={190} height={25} />
					</div>
				</Modal>
			</ConfigProvider >
		</>
	);
};

export default MobileMenu;
