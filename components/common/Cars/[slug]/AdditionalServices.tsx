'use client';

import React, { useMemo } from 'react';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';

interface AdditionalServicesProps {
	additionalOptions: { label: string; value: string }[];
	additionalOptionsSelected?: string[];
	setAdditionalOptions?: (values: string[]) => void;
	deliveryOptions?: { label: string; value: string }[];
	deliveryOptionSelected?: string;
	setDeliveryOption: (value: string) => void;
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
	additionalOptions,
	additionalOptionsSelected = [],
	setAdditionalOptions,
	deliveryOptions,
	deliveryOptionSelected,
	setDeliveryOption,
}) => {
	const defaultDeliveryValue = useMemo(() => {
		if (deliveryOptions) {
			return deliveryOptions[0].value;
		}
	}, []);

	return (
		<div>
			<div className='additional-service-block'>
				<div className='lg:text-lg mt-[14px]'>Место подачи</div>
				<div className='flex gap-2 w-full mt-[10px]'>
					<CustomSelect
						options={deliveryOptions}
						onChange={(value) => setDeliveryOption(value as string)}
						value={deliveryOptionSelected || defaultDeliveryValue}
						placeholder='Выберите район'
						listHeight={232}
						style={{ width: '100%', height: '36px' }}
					/>
				</div>
			</div>
			<div className='flex flex-wrap gap-[10px] mt-3 lg:flex-col lg:gap-3 lg:text-lg'>
				Опции:
				<CheckboxGroup
					className='gap-4'
					options={additionalOptions}
					value={additionalOptionsSelected}
					onChange={setAdditionalOptions}
				/>
			</div>
		</div>
	);
};
