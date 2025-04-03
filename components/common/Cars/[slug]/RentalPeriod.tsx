'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ConfigProvider, DatePicker, TimePicker } from 'antd';
import type { GetProps } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
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
	startTime: Dayjs | null;
	onStartTimeChange: (time: Dayjs | null) => void;
	returnDate: Dayjs | null;
	onReturnDateChange: (date: Dayjs | null) => void;
	returnTime: Dayjs | null;
	onReturnTimeChange: (time: Dayjs | null) => void;
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
	startTime,
	onStartTimeChange,
	returnDate,
	onReturnDateChange,
	returnTime,
	onReturnTimeChange,
}) => {
	const [isChainActive, setIsChainActive] = useState(false);
	const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
	const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
	const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);
	const [isReturnTimeOpen, setIsReturnTimeOpen] = useState(false);

	const today = useMemo(() => dayjs(), []);
	const defaultTime = useMemo(() => {
		const now = dayjs();
		return now.minute() >= 30 ? now.add(1, 'hour').startOf('hour') : now.startOf('hour');
	}, []);

	const [isMobile, setIsMobile] = useState(false);

	const [isStartDateFocused, setIsStartDateFocused] = useState(false);
	const [isStartTimeFocused, setIsStartTimeFocused] = useState(false);
	const [isReturnDateFocused, setIsReturnDateFocused] = useState(false);
	const [isReturnTimeFocused, setIsReturnTimeFocused] = useState(false);

	const getBorderStyle = (focused: boolean) => focused ? '1px solid #f6f6f6' : '1px solid #f6f6f647';

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		setIsMobile(mediaQuery.matches);
		const handleChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		if (startTime) {
			setIsStartTimeOpen(false);
		}
	}, [startTime]);

	return (
		<div className='w-full bg-[#284b63] rounded-2xl p-[18px] mt-4 relative z-10 lg:p-7 lg:mt-[52px]'>
			<div className='hidden lg:block lg:text-3xl lg:mb-6' >Форма бронирования</div>
			<div className='mb-3 lg:text-xl'>Период аренды:</div>
			<div className='lg:flex lg:gap-[10px]'>
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
							},

						},
					}}>
					<div>
						<DatePicker
							placeholder='Дата аренды'
							format={'Выдача: ' + (isMobile ? 'D MMMM' : 'D MMM')}
							suffixIcon={<CalendarIcon active={isStartCalendarOpen} />}
							inputReadOnly
							disabledDate={disabledDateStart}
							allowClear={false}
							onChange={(date) => {
								onStartDateChange(date);
								if (date) {
									setIsChainActive(true);
									setIsStartTimeOpen(true);
								}
							}}
							onOpenChange={(open) => setIsStartCalendarOpen(open)}
							onFocus={() => setIsStartDateFocused(true)}
							onBlur={() => setIsStartDateFocused(false)}
							defaultValue={today}
							value={startDate || today}
							className='datePicker'
							style={{
								width: '60%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isStartDateFocused),
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
							format='HH:mm'
							inputReadOnly
							changeOnScroll
							needConfirm={false}
							addon={() => null}
							minuteStep={30}
							defaultValue={defaultTime}
							suffixIcon={<ChevronDownIcon />}
							allowClear={false}
							onChange={(time) => {
								const normalizedTime = time ? time.startOf('hour') : null;
								onStartTimeChange(normalizedTime);
								setIsStartTimeOpen(false)
								if (isChainActive) {
									setIsReturnDateOpen(true);
								}
							}}
							open={isChainActive ? isStartTimeOpen : undefined}
							onOpenChange={(open) => setIsStartTimeOpen(open)}
							onFocus={() => setIsStartTimeFocused(true)}
							onBlur={() => setIsStartTimeFocused(false)}
							value={startTime || defaultTime}
							className='timePicker'
							style={{
								width: '40%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isStartTimeFocused),
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
							format={'Возврат: ' + (isMobile ? 'D MMMM' : 'D MMM')}
							suffixIcon={<CalendarIcon active={isReturnDateOpen} />}
							inputReadOnly
							disabledDate={disabledDateFinish}
							allowClear={false}
							onChange={(date) => {
								onReturnDateChange(date);
								if (isChainActive) {
									setIsReturnTimeOpen(true);
								}
							}}
							open={isChainActive ? isReturnDateOpen : undefined}
							onOpenChange={(open) => setIsReturnDateOpen(open)}
							onFocus={() => setIsReturnDateFocused(true)}
							onBlur={() => setIsReturnDateFocused(false)}
							value={returnDate}
							className='datePicker'
							style={{
								width: '60%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isReturnDateFocused),
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
							format='HH:mm'
							inputReadOnly
							changeOnScroll
							needConfirm={false}
							addon={() => null}
							minuteStep={30}
							defaultValue={dayjs('12:00', 'HH:mm')}
							suffixIcon={<ChevronDownIcon />}
							allowClear={false}
							onChange={(time) => {
								onReturnTimeChange(time);
							}}
							open={isChainActive ? isReturnTimeOpen : undefined}
							onOpenChange={(open) => setIsReturnTimeOpen(open)}
							onFocus={() => setIsReturnTimeFocused(true)}
							onBlur={() => setIsReturnTimeFocused(false)}
							value={returnTime}
							className='timePicker'
							style={{
								width: '40%',
								backgroundColor: '#f6f6f638',
								border: getBorderStyle(isReturnTimeFocused),
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
