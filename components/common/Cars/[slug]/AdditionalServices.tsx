'use client';

import React from 'react';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';

interface AdditionalServicesProps {
	options: { label: string; value: string }[];
	selected?: string[];
	onChange?: (values: string[]) => void;
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

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
	options,
	selected = [],
	onChange,
}) => {
	return (
		<div>
			<div className='additional-service-block'>
				<div className='lg:text-lg mt-[14px]'>Место подачи</div>
				<div className='flex gap-2 w-full mt-[10px]'>
					<CustomSelect options={optionsDelivery} placeholder='Выберите район' listHeight={232} style={{ width: '100%', height: '36px' }} />
				</div>
			</div>
			<div className='flex flex-wrap gap-[10px] mt-3 lg:flex-col lg:gap-3 lg:text-lg'>
				Опции:
				<CheckboxGroup
					className='gap-4'
					options={options}
					value={selected}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
