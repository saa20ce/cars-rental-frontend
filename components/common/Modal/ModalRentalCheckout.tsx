'use client';

import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Car, Term } from '@/lib/types/Car';
import { RentalPeriod } from '../Cars';
import { ArrowIcon } from '@/lib/ui/icons/ArrowIcon';
import classes from './ModalRentalCheckout.module.css';
import SaleInfo from '../Cards/SaleInfo';

interface ModalRentalCheckoutProps {
    car: Car;
    startDate: string;
    returnDate: string;
    startTime: string;
    returnTime: string;
    hasSeasonDays: boolean;
    deliveryCost: number;
    additionalOptionsTotal: number;
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
    setStartDate: (date: Dayjs | null) => void;
    setReturnDate: (date: Dayjs | null) => void;
    setStartTime: (time: string) => void;
    setReturnTime: (time: string) => void;
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
    setStartDate,
    setReturnDate,
    setStartTime,
    setReturnTime,
    closeModal,
    setIsSubmitted,
    deliveryCost,
    additionalOptionsTotal
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const thumbUrl =
        car.acf?.white_gallery?.[0] ||
        car.acf?.black_gallery?.[0] ||
        car.acf?.gray_gallery?.[0] ||
        car.acf?.blue_gallery?.[0] ||
        car.acf?.red_gallery?.[0] ||
        '';

    const allTerms = car._embedded?.['wp:term'] || [];
    const kuzovTerm = allTerms.flat().find((t: Term) => t.taxonomy === 'kuzov');

    const kuzovName = kuzovTerm ? kuzovTerm.name : '—';

    const discount = car.acf?.skidka;
    const discountedPrice = discount
        ? totalPrice * (1 - Number(discount) / 100)
        : null;

    return (
        <article className={classes.carPriceInfo}>
            <section
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
                <header
                    className={`${classes.flexBetween} lg:block lg:aspect-[5/3] lg:-mx-9 lg:-mt-7 lg:mb-0`}
                >
                    <figure className="relative text-[16px]/[24px] flex flex-row gap-[10px] lg:block lg:w-full lg:h-full">
                        {thumbUrl && (
                            <img
                                src={thumbUrl}
                                alt={car.title.rendered || 'Featured image'}
                                className="w-24 h-[72px] object-cover rounded-xl lg:w-full lg:h-full"
                            />
                        )}
                        <figcaption>
                            {car.acf?.nazvanie_avto && (
                                <h3 className="font-bold uppercase lg:hidden">
                                    {car.acf.nazvanie_avto}
                                </h3>
                            )}
                            <span className="font-normal text-[#f6f6f675] lg:hidden">
                                {kuzovName}
                            </span>
                        </figcaption>
                        {car.acf && <SaleInfo acf={car.acf} />}
                    </figure>

                    <ArrowIcon
                        className={`${isOpen ? '' : 'rotate-180'} transition lg:hidden`}
                    />
                </header>

                <section
                    className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} lg:max-h-full lg:opacity-100 mt-4`}
                >
                    <h2 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:mb-5">
                        Расчет стоимости
                    </h2>

                    <dl className={`mb-3`}>
                        <div
                            className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                        >
                            <dt className={classes.headerCard}>
                                Продолжительность
                            </dt>
                            <dd className={classes.descCard}>
                                {daysCount} {daysCount === 1 ? 'день' : 'дней'}
                            </dd>
                        </div>

                        <div
                            className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                        >
                            <dt className={classes.headerCard}>
                                Цена за сутки
                                {hasSeasonDays && (
                                    <span className="font-bold text-[#f6f6f666]">
                                        {' '}
                                        (Сезон)
                                    </span>
                                )}
                            </dt>
                            <dd className={classes.descCard}>
                                {pricePerDay.toLocaleString()} ₽/сут.
                            </dd>
                        </div>

                        <div
                            className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                        >
                            <dt className={classes.headerCard}>Залог</dt>
                            <dd className={classes.descCard}>10 000 ₽</dd>
                        </div>

                        <div
                            className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                        >
                            <dt className={classes.headerCard}>Пробег</dt>
                            <dd className={classes.descCard}>6 км.</dd>
                        </div>

                        <div
                            className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                        >
                            <dt className={classes.headerCard}>
                                Перепробег за 1 км
                            </dt>
                            <dd className={classes.descCard}>6 ₽/км.</dd>
                        </div>
                        {additionalOptionsTotal > 0 && (
                            <div
                                className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                            >
                                <dt className={classes.headerCard}>
                                    Дополнительные опции
                                </dt>
                                <dd className={classes.descCard}>
                                    {additionalOptionsTotal} ₽
                                </dd>
                            </div>
                        )}

                        {deliveryCost > 0 && (
                            <div
                                className={`${classes.flexBetween} ${classes.borderBot} py-[6px] lg:py-[10px]`}
                            >
                                <dt className={classes.headerCard}>Доставка</dt>
                                <dd className={classes.descCard}>
                                    {deliveryCost} ₽
                                </dd>
                            </div>
                        )}
                    </dl>

                    <div
                        className={`${classes.flexBetween} items-center mt-8 lg:mt-9`}
                    >
                        <div className="flex flex-col">
                            <span className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold">
                                Итого:
                            </span>
                            {discountedPrice && (
                                <span className="text-[14px]/[20px] lg:text-[18px]/[28px] font-semibold text-[#F6F6F699]">
                                    С учетом скидки
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            {discountedPrice ? (
                                <>
                                    <span className="font-bold text-[24px]/[32px] xl:text-[30px]/[36px] text-[#FFD7A6]">
                                        {discountedPrice} ₽
                                    </span>
                                    <span className="line-through text-[14px]/[20px] xl:text-[20px]/[28px] text-[#F6F6F699]">
                                        {totalPrice} ₽
                                    </span>
                                </>
                            ) : (
                                <span className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                                    {totalPrice} ₽
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            </section>

            <RentalPeriod
                car={car}
                startDate={dayjs(startDate)}
                onStartDateChange={setStartDate}
                startTime={startTime}
                onStartTimeChange={setStartTime}
                returnDate={dayjs(returnDate)}
                returnTime={returnTime}
                onReturnDateChange={setReturnDate}
                onReturnTimeChange={setReturnTime}
                daysCount={daysCount}
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
        </article>
    );
};
