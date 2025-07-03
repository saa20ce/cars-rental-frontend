'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DatePicker } from 'antd';
import type { GetProps } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CustomDatePicker } from '@/lib/ui/common/DatePicker/CustomDatePicker';
import { AdditionalServices } from './AdditionalServices';
import { RentalCheckoutContactForm } from '@/components/common/Form/RentalCheckoutContactForm';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
	monthsShort: ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
});

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface RentalPeriodProps {
	additionalOptions: { label: string; value: string }[];
	startDate?: Dayjs | null;
	onStartDateChange?: (date: Dayjs | null) => void;
	returnDate?: Dayjs | null;
	onReturnDateChange?: (date: Dayjs | null) => void;
	selectedOptions?: string[];
	onSelectOptionsChange?: (opts: string[]) => void;
	showContactForm?: boolean;
}

const disabledDateStart: RangePickerProps['disabledDate'] = (current) => {
	return current && current < dayjs().startOf('day');
};

const disabledDateFinish: RangePickerProps['disabledDate'] = (current) => {
	return current && current < dayjs().endOf('day');
};

export const RentalPeriod: React.FC<RentalPeriodProps> = ({
	additionalOptions,
	startDate = null,
	onStartDateChange,
	returnDate = null,
	onReturnDateChange,
	selectedOptions = [],
	onSelectOptionsChange,
	showContactForm = false,
}) => {
	const [isChainActive, setIsChainActive] = useState(false);
	const [isReturnDateOpen, setIsReturnDateOpen] = useState(false);

	const today = useMemo(() => dayjs(), []);

	const [isMobile, setIsMobile] = useState(false);

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
		<div className='w-full bg-[#284b63] rounded-2xl px-6 py-7 mt-6 relative z-10 lg:p-9 lg:mt-[52px] lg:rounded-[32px] '>
			<div className='text-xl mb-4 lg:text-3xl lg:mb-6' >Форма бронирования</div>
			<div className='mb-[10px] lg:text-xl'>Период аренды:</div>
			<div className='flex flex-col gap-2 lg:flex-row lg:gap-[10px]'>

				<div className='flex'>
					<CustomDatePicker
						placeholder='Дата аренды'
						disabledDate={disabledDateStart}
						defaultValue={today}
						value={startDate || today}
						onChange={(date) => {
							onStartDateChange?.(date);
							if (date) setIsChainActive(true);
						}}
						width='58%'
						isMobile={isMobile}
						style={{
							borderTopLeftRadius: 12,
							borderBottomLeftRadius: 12,
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						}}
					/>

					<CustomSelect
						placeholder='18:00'
						options={timeOptions}
						className='timePicker'
						defaultValue={defaultTimeValue}
					/>
				</div>

				<div className='flex'>
					<CustomDatePicker
						placeholder='Возврат'
						disabledDate={disabledDateFinish}
						value={returnDate}
						onChange={(date) => onReturnDateChange?.(date)}
						width='58%'
						isMobile={isMobile}
						open={isChainActive ? isReturnDateOpen : undefined}
						onOpenChange={(open) => setIsReturnDateOpen(open)}
						style={{
							borderTopLeftRadius: 12,
							borderBottomLeftRadius: 12,
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						}}
					/>

					<CustomSelect
						placeholder='18:00'
						options={timeOptions}
						className='timePicker'
						defaultValue={defaultTimeValue}
					/>
				</div>
			</div>

			<AdditionalServices
				options={additionalOptions}
				selected={selectedOptions}
				onChange={onSelectOptionsChange}
			/>

			{showContactForm && <RentalCheckoutContactForm />}
		</div>
	);
};
