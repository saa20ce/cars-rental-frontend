'use client';

import React from 'react';
import { ConfigProvider, DatePicker, TimePicker } from 'antd';
import locale from 'antd/locale/ru_RU';
import { CalendarIcon, ChevronDownIcon } from '@/lib/ui/icons';
import { Dayjs } from 'dayjs';
import { AdditionalServices } from './AdditionalServices';

interface RentalPeriodProps {
	additionalOptions: { label: string; value: string }[];
	startDate: Dayjs | null;
	onStartDateChange: (date: Dayjs | null) => void;
	startTime: Dayjs | null;
	onStartTimeChange: (time: Dayjs | null) => void;
	returnDate: Dayjs | null;
	onReturnDateChange: (date: Dayjs | null) => void;
	returnTime: Dayjs | null;
	onReturnTimeChange: (time: Dayjs | null) => void;
}

export const RentalPeriod: React.FC<RentalPeriodProps> = ({
	additionalOptions,
	startDate,
	onStartDateChange,
	startTime,
	onStartTimeChange,
	returnDate,
	onReturnDateChange,
	returnTime,
	onReturnTimeChange,
}) => {
	return (
		<div className='w-full bg-[#284b63] rounded-2xl p-[18px] mt-4 relative z-10 lg:p-7 lg:mt-[52px]'>
			<div className='hidden lg:block lg:text-3xl lg:mb-6' >Форма бронирования</div>
			<div className='mb-3 lg:text-xl'>Период аренды:</div>
			<div className='lg:flex lg:gap-[10px]'>
				<ConfigProvider locale={locale}>
					<div>
						<DatePicker
							placeholder='Дата аренды'
							suffixIcon={<CalendarIcon />}
							allowClear={false}
							onChange={onStartDateChange}
							value={startDate}
							style={{
								width: '60%',
								backgroundColor: '#f6f6f638',
								border: '1px solid #f6f6f647',
								borderTopLeftRadius: 10,
								borderTopRightRadius: 0,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 0,
								paddingLeft: 16,
								height: 36,
								color: '#f6f6f6',
							}}
						/>
						<TimePicker
							placeholder='18:00'
							suffixIcon={<ChevronDownIcon />}
							allowClear={false}
							onChange={onStartTimeChange}
							value={startTime}
							style={{
								width: '40%',
								backgroundColor: '#f6f6f638',
								border: '1px solid #f6f6f647',
								marginBottom: 8,
								borderLeft: 0,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 10,
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 10,
								paddingLeft: 16,
								paddingRight: 20,
								height: 36,
								color: '#f6f6f6',
							}}
						/>
					</div>

					<div>
						<DatePicker
							placeholder='Дата возврата'
							suffixIcon={<CalendarIcon />}
							allowClear={false}
							onChange={onReturnDateChange}
							value={returnDate}
							style={{
								width: '60%',
								backgroundColor: '#f6f6f638',
								border: '1px solid #f6f6f647',
								borderTopLeftRadius: 10,
								borderTopRightRadius: 0,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 0,
								paddingLeft: 16,
								height: 36,
								color: '#f6f6f6',
							}}
						/>
						<TimePicker
							placeholder='18:00'
							suffixIcon={<ChevronDownIcon />}
							allowClear={false}
							onChange={onReturnTimeChange}
							value={returnTime}
							style={{
								width: '40%',
								backgroundColor: '#f6f6f638',
								border: '1px solid #f6f6f647',
								marginBottom: 8,
								borderLeft: 0,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 10,
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 10,
								paddingLeft: 16,
								paddingRight: 20,
								height: 36,
								color: '#f6f6f6',
							}}
						/>
					</div>
				</ConfigProvider>
			</div>
			<AdditionalServices options={additionalOptions} />
		</div>
	);
};
