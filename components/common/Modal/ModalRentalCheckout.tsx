'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import { Car, Term } from '@/lib/types/Car';
import { RentalPeriod } from '../Cars';
import { ArrowIcon } from '@/lib/ui/icons/ArrowIcon';
import classes from './ModalRentalCheckout.module.css';

interface ModalRentalCheckoutProps {
    car: Car;
    startDate: string;
    returnDate: string;
    startTime: string;
    returnTime: string;
    hasSeasonDays: boolean;
    additionalOptions: { label: string; value: string }[];
    additionalOptionsSelected: string[];
    setAdditionalOptions: (opts: string[]) => void;
    deliveryOptions: { label: string; value: string }[];
    deliveryOptionSelected: string;
    setDeliveryOption: (opt: string) => void;
    daysCount: number;
    pricePerDay: number;
    totalPrice: number;
    closeModal?: () => void;
    setIsSubmitted: (isSubmitted: boolean) => void;
}

export const ModalRentalCheckout: React.FC<ModalRentalCheckoutProps> = ({
    car,
    startDate,
    returnDate,
    startTime,
    returnTime,
    hasSeasonDays,
    additionalOptions,
    additionalOptionsSelected,
    setAdditionalOptions,
    deliveryOptions,
    deliveryOptionSelected,
    setDeliveryOption,
    daysCount,
    pricePerDay,
    totalPrice,
    closeModal,
    setIsSubmitted,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const thumbUrl =
        car._embedded?.['wp:featuredmedia']?.[0]?.media_details.sizes.thumbnail
            .source_url;

    const allTerms = car._embedded?.['wp:term'] || [];
    const kuzovTerm = allTerms.flat().find((t: Term) => t.taxonomy === 'kuzov');

    const kuzovName = kuzovTerm ? kuzovTerm.name : '—';

    return (
        <div className={classes.carPriceInfo}>
            <div
                className={`
					lg:flex-1
					lg:max-w-[404px]
  				bg-[#f6f6f60e] rounded-2xl p-6 
  				transition-[max-height,opacity,padding] duration-500
  				${isOpen ? 'pt-[28px] pb-6' : 'pt-[28px] pb-3'}
					lg:px-9 lg:pb-[38px]
					lg:min-w-[370px]
				`}
                onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen((prev) => !prev);
                }}
            >
                <div
                    className={`${classes.flexBetween} lg:block lg:aspect-[5/3] lg:-mx-9 lg:-mt-7 lg:mb-0`}
                >
                    <div className="text-[16px]/[24px] flex flex-row gap-[10px] lg:block lg:w-full lg:h-full">
                        {thumbUrl && (
                            <img
                                src={thumbUrl}
                                alt={car.title.rendered || 'Featured image'}
                                className="w-24 h-[72px] object-cover rounded-xl lg:w-full lg:h-full"
                            />
                        )}
                        <div>
                            {car.acf?.nazvanie_avto && (
                                <h3 className="font-bold uppercase lg:hidden">
                                    {car.acf.nazvanie_avto}
                                </h3>
                            )}
                            <span className="font-normal text-[#f6f6f675] lg:hidden">
                                {kuzovName}
                            </span>
                        </div>
                    </div>

                    <ArrowIcon
                        className={`${isOpen ? '' : 'rotate-180'} transition lg:hidden`}
                    />
                </div>

                <div
                    className={`
      			overflow-hidden transition-all duration-500
      			${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
      			lg:max-h-full lg:opacity-100 mt-4
						lg:px-
    			`}
                >
                    <h3 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:mb-5">
                        Расчет стоимости
                    </h3>

                    <div
                        className={`${classes.borderBot} mb-3 text-sm lg:text-lg`}
                    >
                        <div
                            className={`${classes.flexBetween} mb-[6px] lg:mb-[10px]`}
                        >
                            <span className={classes.headerCard}>
                                Продолжительность
                            </span>
                            <span className={classes.descCard}>
                                {daysCount} {daysCount === 1 ? 'день' : 'дней'}
                            </span>
                        </div>
                    </div>

                    <div className={`${classes.borderBot} lg:text-lg`}>
                        <div
                            className={`${classes.flexBetween} my-[6px] lg:my-[10px]`}
                        >
                            <span className={classes.headerCard}>
                                Цена за сутки
                                {hasSeasonDays && (
                                    <span className="font-bold text-[#f6f6f666]">
                                        {' '}
                                        (Сезон)
                                    </span>
                                )}
                            </span>
                            <span className={classes.descCard}>
                                {pricePerDay.toLocaleString()} ₽/сут.
                            </span>
                        </div>
                    </div>

                    <div className={`${classes.borderBot} text-sm lg:text-lg`}>
                        <div
                            className={`${classes.flexBetween} my-[6px] lg:my-[10px]`}
                        >
                            <span className={classes.headerCard}>Залог</span>
                            <span className={classes.descCard}>10 000 ₽</span>
                        </div>
                    </div>

                    <div className={`${classes.borderBot} text-sm lg:text-lg`}>
                        <div
                            className={`${classes.flexBetween} my-[6px] lg:my-[10px]`}
                        >
                            <span className={classes.headerCard}>Пробег</span>
                            <span className={classes.descCard}>6 км.</span>
                        </div>
                    </div>

                    <div className={`${classes.borderBot} text-sm lg:text-lg`}>
                        <div
                            className={`${classes.flexBetween} my-[6px] lg:my-[10px]`}
                        >
                            <span className={classes.headerCard}>
                                Перепробег за 1 км
                            </span>
                            <span className={classes.descCard}>6 ₽/км.</span>
                        </div>
                    </div>

                    <div
                        className={`${classes.flexBetween} items-center mt-8 lg:mt-9`}
                    >
                        <span className="font-bold text-[16px]/[24px] lg:text-[24px]/[32px]">
                            Итого:
                            {hasSeasonDays && (
                                <div className="flex font-semibold items-center gap-2 text-[10px]/[18px]  lg:text-[12px]/[18px]">
                                    с учетом сезонности <LineIcon />{' '}
                                    <InfoIcon width={20} height={20} />
                                </div>
                            )}
                        </span>
                        <span className="font-bold text-2xl lg:text-4xl">
                            {totalPrice} ₽
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <RentalPeriod
                    car={car}
                    startDate={dayjs(startDate)}
                    startTime={startTime}
                    onStartDateChange={undefined}
                    returnDate={dayjs(returnDate)}
                    returnTime={returnTime}
                    daysCount={daysCount}
                    onReturnDateChange={undefined}
                    additionalOptions={additionalOptions}
                    additionalOptionsSelected={additionalOptionsSelected}
                    setAdditionalOptions={setAdditionalOptions}
                    deliveryOptions={deliveryOptions}
                    deliveryOptionSelected={deliveryOptionSelected}
                    setDeliveryOption={setDeliveryOption}
                    showContactForm={true}
                    totalPrice={totalPrice}
                    pricePerDay={pricePerDay}
                    closeModal={closeModal}
                    setIsSubmitted={setIsSubmitted}
                />
            </div>
        </div>
    );
};
