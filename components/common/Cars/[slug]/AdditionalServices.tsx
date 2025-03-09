'use client';

import React, { useState } from 'react';
import { ConfigProvider, Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { ChevronDownIcon } from '@/lib/ui/icons';

interface AdditionalServicesProps {
	options: { label: string; value: string }[];
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
	options,
}) => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		setVisible((prev) => !prev);
	};

	return (
		<div>
			<div
				className='mt-3 cursor-pointer flex items-center transition-all'
				style={{
					marginBottom: visible ? 12 : 0,
				}}
				onClick={toggleVisible}
			>
				Дополнительные услуги{' '}
				<span
					style={{
						transform: visible ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.3s ease',
						marginLeft: 6,
					}}
				>
					<ChevronDownIcon fillOpacity={1} />
				</span>
			</div>
			{visible && (
				<div>
					<div>Место подачи и возврата</div>
					<div className='flex gap-2 w-full mt-2'>
						<ConfigProvider
							theme={{
								components: {
									Select: {
										selectorBg: '#f6f6f638',
										activeBorderColor: '#f6f6f647',
										hoverBorderColor: '#f6f6f647',
										colorBorder: '#f6f6f647',
										colorTextPlaceholder: '#f6f6f666',
										borderRadius: 10,
										fontSizeIcon: 18,
									},
								},
							}}
						>
							<Select
								className='flex items-center'
								placeholder='Место подачи'
								suffixIcon={<ChevronDownIcon />}
								style={{
									width: '50%',
									height: 36,
								}}
							/>
							<Select
								placeholder='Место возврата'
								suffixIcon={<ChevronDownIcon />}
								style={{
									width: '50%',
									height: 36,
								}}
							/>
						</ConfigProvider>
					</div>
					<div className='mt-[10px]'>
						Опции:
						<CheckboxGroup options={options} />
					</div>
				</div>
			)}
		</div>
	);
};
