'use client';

import React, { useState } from 'react';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { ChevronDownIcon } from '@/lib/ui/icons';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';

interface AdditionalServicesProps {
	options: { label: string; value: string }[];
}

const optionsDelivery = [
	{
		value: 'List Item 1', label: 'List Item 1',
	},
	{
		value: 'List Item 2', label: 'List Item 2',
	},
	{
		value: 'List Item 3', label: 'List Item 3',
	},
	{
		value: 'List Item 4', label: 'List Item 4',
	},
	{
		value: 'List Item 5', label: 'List Item 5',
	},
];

const optionsReturn = [
	{
		value: 'List Item 1', label: 'List Item 1',
	},
	{
		value: 'List Item 2', label: 'List Item 2',
	},
	{
		value: 'List Item 3', label: 'List Item 3',
	},
	{
		value: 'List Item 4', label: 'List Item 4',
	},
	{
		value: 'List Item 5', label: 'List Item 5',
	},
];


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
				<div className='lg:text-xl'>Доставка{' '}</div>
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
					<div className='additional-service-block'>
						<div className='lg:text-lg'>Место подачи и возврата</div>
						<div className='flex gap-2 w-full mt-2'>
							<CustomSelect options={optionsDelivery} placeholder='Место подачи' listHeight={232} />
							<CustomSelect options={optionsReturn} placeholder='Место возврата' listHeight={232} />
						</div>
					</div>
					<div className='mt-[10px] lg:flex lg:flex-col lg:gap-2 lg:text-lg'>
						Опции:
						<CheckboxGroup options={options} />
					</div>
				</div>
			)}
		</div>
	);
};
