'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ConfigProvider, DatePicker, Select } from 'antd';
import type { GetProps } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CalendarIcon, ChevronDownIcon } from '@/lib/ui/icons';
import { AdditionalServices } from './AdditionalServices';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
	monthsShort: ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
});

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface RentalPeriodProps {
	additionalOptions: { label: string; value: string }[];
	startDate: Dayjs | null;
	onStartDateChange: (date: Dayjs | null) => void;
	returnDate: Dayjs | null;
	onReturnDateChange: (date: Dayjs | null) => void;
}

const disabledDateStart: RangePickerProps['disabledDate'] = (current) => {
	return current && current < dayjs().startOf('day');
};

const disabledDateFinish: RangePickerProps['disabledDate'] = (current) => {
	return current && current < dayjs().endOf('day');
};

export const RentalPeriod: React.FC<RentalPeriodProps> = ({
	additionalOptions,
	startDate,
	onStartDateChange,
	returnDate,
	onReturnDateChange,
}) => {
	const [isChainActive, setIsChainActive] = useState(false);
	const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
	const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);

	const today = useMemo(() => dayjs(), []);

	const [isMobile, setIsMobile] = useState(false);

	const [isStartDateFocused, setIsStartDateFocused] = useState(false);
	const [isReturnDateFocused, setIsReturnDateFocused] = useState(false);

	const getBorderStyle = (focused: boolean) => focused ? '1px solid #f6f6f6' : '1px solid #f6f6f647';

	const timeOptions = Array.from({ length: 24 }, (_, i) => {
		const hour = i.toString().padStart(2, '0');
		return { value: `${hour}:00`, label: `${hour}:00` };
	});

	const defaultTimeValue = useMemo(() => {
		const now = dayjs();
		const hour = now.minute() >= 30 ? now.add(1, 'hour').hour() : now.hour();
		return `${hour.toString().padStart(2, '0')}:00`;
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		setIsMobile(mediaQuery.matches);
		const handleChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return (
		<div className='w-full bg-[#284b63] rounded-2xl p-[18px] mt-4 relative z-10 lg:p-9 lg:mt-[52px] lg:rounded-[32px] '>
			<div className='hidden lg:block lg:text-3xl lg:mb-6' >Форма бронирования</div>
			<div className='mb-3 lg:text-xl'>Период аренды:</div>
			<div className='flex flex-col gap-2 lg:flex-row lg:gap-[10px]'>
				<ConfigProvider
					locale={locale}
					theme={{
						token: {
							colorBgElevated: '#284152',
							colorText: '#f6f6f6',
							colorTextDisabled: '#f6f6f675',
							colorIcon: '#f6f6f6',
							colorPrimary: '#f6f6f6',
							controlItemBgActive: '#f6f6f60e',
							colorTextLightSolid: '#284b63',

						},
						components: {
							DatePicker: {
								cellHoverBg: '#284b63',
								activeBorderColor: '#f6f6f675',
								cellActiveWithRangeBg: '#284b63',
								paddingInline: 16,
							},
							// Select: {
							// 	colorTextPlaceholder: '#f6f6f6',
							// 	activeBorderColor: '#f6f6f6',
							// }
						},
					}}>

					<div className='flex'>
						<DatePicker
							placeholder='Дата аренды'
							format={(isMobile ? 'D MMMM' : 'D MMM')}
							suffixIcon={<CalendarIcon active={isStartCalendarOpen} />}
							inputReadOnly
							disabledDate={disabledDateStart}
							allowClear={false}
							onChange={(date) => {
								onStartDateChange(date);
								if (date) {
									setIsChainActive(true);
								}
							}}
							onOpenChange={(open) => setIsStartCalendarOpen(open)}
							onFocus={() => setIsStartDateFocused(true)}
							onBlur={() => setIsStartDateFocused(false)}
							defaultValue={today}
							value={startDate || today}
							className='datePicker'
							style={{
								width: '58%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isStartDateFocused),
								borderTopLeftRadius: 12,
								borderTopRightRadius: 0,
								borderBottomLeftRadius: 12,
								borderBottomRightRadius: 0,
								// paddingLeft: 16,
								height: 36,
								color: '#f6f6f6',
							}}
						/>

						<CustomSelect
							placeholder='18:00'
							options={timeOptions}
							className='timePicker'
							defaultValue={defaultTimeValue}
							suffixIcon={<ChevronDownIcon />}
						/>
					</div>

					<div className='flex'>
						<DatePicker
							placeholder='Возврат'
							format={(isMobile ? 'D MMMM' : 'D MMM')}
							suffixIcon={<CalendarIcon active={isReturnDateOpen} />}
							inputReadOnly
							disabledDate={disabledDateFinish}
							allowClear={false}
							onChange={(date) => {
								onReturnDateChange(date);
							}}
							open={isChainActive ? isReturnDateOpen : undefined}
							onOpenChange={(open) => setIsReturnDateOpen(open)}
							onFocus={() => setIsReturnDateFocused(true)}
							onBlur={() => setIsReturnDateFocused(false)}
							value={returnDate}
							className='datePicker'
							style={{
								width: '58%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isReturnDateFocused),
								borderTopLeftRadius: 10,
								borderTopRightRadius: 0,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 0,
								// paddingLeft: 16,
								height: 36,
								color: '#f6f6f6',
							}}
						/>

						<CustomSelect
							placeholder='18:00'
							options={timeOptions}
							className='timePicker'
							defaultValue={defaultTimeValue}
							suffixIcon={<ChevronDownIcon />}
						/>
					</div>
				</ConfigProvider>
			</div>
			<AdditionalServices options={additionalOptions} />
		</div>
	);
};
