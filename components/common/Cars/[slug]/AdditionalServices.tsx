'use client';

import React, { useState } from 'react';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { ChevronDownIcon } from '@/lib/ui/icons';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';

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
				<div className='lg:text-xl'>Дополнительные услуги{' '}</div>
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
							<CustomSelect placeholder='Место подачи' />
							<CustomSelect placeholder='Место возврата' />
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
