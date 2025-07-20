'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DatePicker } from 'antd';
import type { GetProps } from 'antd';
import type { Car, Term } from '@/lib/types/Car';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { CustomDatePicker } from '@/lib/ui/common/DatePicker/CustomDatePicker';
import { AdditionalServices } from './AdditionalServices';
import { RentalCheckoutContactForm } from '@/components/common/Form/RentalCheckoutContactForm';
import { CloseIcon } from '@/lib/ui/icons';
import { start } from 'repl';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
	monthsShort: ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
});


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface RentalPeriodProps {
	car: Car;
	startDate: Dayjs | null;
	onStartDateChange?: (date: Dayjs | null) => void;
	startTime?: string;
	onStartTimeChange?: (time: string) => void;
	returnDate: Dayjs | null;
	onReturnDateChange?: (date: Dayjs | null) => void;
	returnTime?: string;
	onReturnTimeChange?: (time: string) => void;
	daysCount: number;
	additionalOptions: { label: string; value: string }[];
	additionalOptionsSelected: string[];
	setAdditionalOptions?: (opts: string[]) => void;
	deliveryOptions: { label: string; value: string }[];
	deliveryOptionSelected: string;
	setDeliveryOption: (opt: string) => void;
	totalPrice?: number;
	pricePerDay?: number;
	showContactForm?: boolean;
	closeModal?: () => void;
	setIsSubmitted?: (isSubmitted: boolean) => void;
}

export const RentalPeriod: React.FC<RentalPeriodProps> = ({
	car,
	startDate = null,
	onStartDateChange,
	startTime,
	onStartTimeChange,
	returnTime,
	onReturnTimeChange,
	returnDate = null,
	onReturnDateChange,
	daysCount,
	additionalOptions,
	additionalOptionsSelected = [],
	setAdditionalOptions,
	deliveryOptions,
	deliveryOptionSelected,
	setDeliveryOption,
	totalPrice = 0,
	pricePerDay = 0,
	showContactForm = false,
	closeModal,
	setIsSubmitted,
}) => {
	const allTerms = car._embedded?.['wp:term'] || [];
	const colorTerm = allTerms
		.flat()
		.find((t: Term) => t.taxonomy === 'color');

	const autoColor = colorTerm?.name ?? '—';
	const autoName = car.acf?.nazvanie_avto ?? car.title.rendered;
	const rentDate = `${startDate} ${startTime} – ${returnDate} ${returnTime}`;
	const rentPeriod = `${daysCount} ${daysCount === 1 ? 'день' : 'дней'}`;
	const optionsStr = additionalOptionsSelected.join(', ');

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

	const disabledDateStart: RangePickerProps['disabledDate'] = (current) => {
		if (returnDate){
			return(
				current && 
				(current < dayjs().startOf('day') || current> returnDate.startOf('day'))
			);
		}
		return current && current < dayjs().startOf('day');
	};

	const disabledDateFinish: RangePickerProps['disabledDate'] = (current) => {
		if (!startDate) return true;
		return current && current < startDate.startOf('day');
	};

	return (
		<div className='w-full bg-[#284b63]  rounded-2xl px-6 py-7 mt-6 lg:mt-0 relative z-10 lg:p-9 lg:rounded-[32px] '>
			{showContactForm && closeModal && (
				<div
					className='absolute top-6 right-6 cursor-pointer'
					onClick={closeModal}
				>
					<CloseIcon />
				</div>
			)}

			<h2 className='text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:text-3xl lg:mb-5' >Форма бронирования</h2>
			<h4 className='text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mb-[10px] lg:mb-3'>Период аренды:</h4>
			<div className='flex flex-col gap-2 lg:flex-row lg:gap-[10px]'>

				<div className='flex'>
					<CustomDatePicker
						placeholder='Дата аренды'
						disabledDate={disabledDateStart}
						value={startDate}
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
						value={startTime || defaultTimeValue}
						onChange={(val) => onStartTimeChange?.(val as string)}
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
						disabled={!startDate}
					/>

					<CustomSelect
						placeholder='18:00'
						options={timeOptions}
						className='timePicker'
						value={returnTime || defaultTimeValue}
						onChange={(val) => onReturnTimeChange?.(val as string)}
					/>
				</div>
			</div>

			<AdditionalServices
				additionalOptions={additionalOptions}
				additionalOptionsSelected={additionalOptionsSelected}
				setAdditionalOptions={setAdditionalOptions}
				deliveryOptions={deliveryOptions}
				deliveryOptionSelected={deliveryOptionSelected}
				setDeliveryOption={setDeliveryOption}
			/>

			{showContactForm &&
				<RentalCheckoutContactForm
					autoName={autoName}
					autoColor={autoColor}
					rentDate={rentDate}
					rentPeriod={rentPeriod}
					delivery={deliveryOptionSelected}
					options={optionsStr}
					totalPrice={totalPrice}
					pricePerDay={pricePerDay}
					onSuccess={() => setIsSubmitted?.(true)}
				/>
			}
		</div>
	);
};
