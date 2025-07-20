'use client';

import React from 'react';
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
	setAdditionalOptions = () => { },
	deliveryOptions,
	deliveryOptionSelected,
	setDeliveryOption,
}) => {

	return (
		<div>
			<div className='additional-service-block'>
				<div className='lg:text-lg mt-[14px]'>Место подачи</div>
				<div className='flex gap-2 w-full mt-[10px]'>
					<CustomSelect

						options={[
							{ label: 'Без подачи', value: 'no_delivery' },
							...(deliveryOptions || [])
						]}
						onChange={(value) => setDeliveryOption(value as string)}
						value={deliveryOptionSelected || undefined}
						placeholder='Выберите место подачи'
						listHeight={232}
						style={{ width: '100%', height: '36px' }}
					/>
				</div>
			</div>

			<div className='flex flex-wrap gap-[10px] mt-3 lg:flex-col lg:gap-3 lg:text-lg'>
				Опции:
				<CheckboxGroup
					className='gap-4'
					options={additionalOptions.map((opt) => ({
						label: opt.label,
						value: opt.value,
					}))}
					value={additionalOptionsSelected}
					onChange={(values) => setAdditionalOptions(values as string[])}
				/>
			</div>
		</div>
	);
};
