'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import { Car, Term, SeasonData, PriceRange, DeliveryPrice } from '@/lib/types/Car';
import { RentalPeriod } from '../Cars';
import { ArrowIcon } from '@/lib/ui/icons/ArrowIcon';
import { Tooltip } from 'antd';
import { computeCostsChunked, isDaySeason } from '@/lib/helpers/RentalCheckoutHelper';

interface OptionWithPrice {
  label: string;
  value: string;
  price?: number;
}

const tooltipText = (
  <div className="text-xs lg:text-sm">
    Сезонные тарифы (высокий спрос)
    <ul className="list-decimal list-inside pl-1 font-bold">
      <li>10 декабря - 20 января</li>
      <li>1 мая - 15 сентября</li>
    </ul>
  </div>
);

interface ModalRentalCheckoutProps {
  car: Car;
  startDate: string;
  returnDate: string;
  startTime: string;
  returnTime: string;
  seasonDates: SeasonData | null;
  priceRanges: PriceRange[];
  additionalOptions: OptionWithPrice[];
  additionalOptionsSelected: string[];
  setAdditionalOptions: (opts: string[]) => void;
  deliveryPrice: DeliveryPrice;
  deliveryOptionSelected: string;
  setDeliveryOption: (opt: string) => void;
  closeModal?: () => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  daysCount: number;
  hasSeasonDays: boolean;
  deliveryOptions: OptionWithPrice[];
  pricePerDay: number;
  totalPrice: number;
}

export const ModalRentalCheckout: React.FC<ModalRentalCheckoutProps> = ({
  car,
  startDate: startDateProp,
  returnDate: returnDateProp,
  startTime: startTimeProp,
  returnTime: returnTimeProp,
  seasonDates,
  priceRanges,
  additionalOptions,
  additionalOptionsSelected,
  setAdditionalOptions,
  deliveryPrice,
  deliveryOptionSelected,
  setDeliveryOption,
  closeModal,
  setIsSubmitted,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(startDateProp));
  const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs(returnDateProp));
  const [startTime, setStartTime] = useState(startTimeProp);
  const [returnTime, setReturnTime] = useState(returnTimeProp);
  const [daysCount, setDaysCount] = useState(0);
  const [dailyCosts, setDailyCosts] = useState<number[]>([]);
  const [hasSeasonDays, setHasSeasonDays] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState<OptionWithPrice[]>([]);
  const [seasonMode, setSeasonMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const thumbUrl = car._embedded?.['wp:featuredmedia']?.[0]?.media_details.sizes.thumbnail?.source_url;
  const allTerms = car._embedded?.['wp:term'] || [];
  const kuzovTerm = allTerms.flat().find((t: Term) => t.taxonomy === 'kuzov');
  const kuzovName = kuzovTerm?.name ?? '—';

  useEffect(() => {
    if (!startDate) setStartDate(dayjs());

    if (startDate && returnDate) {
      const exactDiffHours = returnDate.diff(startDate, 'hour', true);
      let totalDays = Math.max(0, Math.ceil(exactDiffHours / 24));
      if (totalDays < 3) {
        const adjustedEnd = startDate.add(3, 'day');
        setReturnDate(adjustedEnd);
        totalDays = 3;
      }
      setDaysCount(totalDays);

      let allDaysSeason = true;
      if (seasonDates) {
        let currentDay = startDate.startOf('day');
        const endDay = returnDate.startOf('day');
        while (currentDay.isBefore(endDay) || currentDay.isSame(endDay)) {
          if (!isDaySeason(currentDay, seasonDates)) {
            allDaysSeason = false;
            break;
          }
          currentDay = currentDay.add(1, 'day');
        }
      }

      setSeasonMode(allDaysSeason);
      setHasSeasonDays(allDaysSeason);
      setDailyCosts(computeCostsChunked(startDate, returnDate, priceRanges, seasonDates));
      setShowCost(true);
    } else {
      setShowCost(false);
      setDaysCount(0);
      setDailyCosts([]);
      setSeasonMode(false);
      setHasSeasonDays(false);
    }
  }, [startDate, returnDate, priceRanges, seasonDates]);

  useEffect(() => {
    const hour = parseInt(startTime.split(':')[0], 10);
    const isNight = hour >= 20 || hour < 9;
    const options = isNight ? deliveryPrice.night : deliveryPrice.day;

    setDeliveryOptions([{ label: 'Без подачи', value: 'none', price: 0 }, ...options]);
  }, [startTime, deliveryPrice]);

  const pricePerDay = dailyCosts[0] || 0;

  const additionalOptionsTotal = useMemo(() => {
    return additionalOptions
      .filter((opt) => additionalOptionsSelected.includes(opt.value))
      .reduce((sum, opt) => sum + (opt.price ?? 0), 0);
  }, [additionalOptionsSelected, additionalOptions]);

  const deliveryCost = useMemo(() => {
    const selected = deliveryOptions.find((opt) => opt.value === deliveryOptionSelected);
    return selected?.price ?? 0;
  }, [deliveryOptionSelected, deliveryOptions]);

  const totalPrice = dailyCosts.reduce((acc, val) => acc + val, 0) + additionalOptionsTotal + deliveryCost;

  return (
    <div className="carPriceInfo">
      <div
        className={`
          lg:flex-1 lg:max-w-[404px]
          bg-[#f6f6f60e] rounded-2xl p-6
          transition-[max-height,opacity,padding] duration-500
          ${isOpen ? 'pt-[28px] pb-6' : 'pt-[28px] pb-3'}
          lg:px-9 lg:pb-[38px] lg:min-w-[370px]
        `}
        onClick={() => {
          if (window.innerWidth < 1024) setIsOpen((prev) => !prev);
        }}
      >
        <div className="flex justify-between lg:block lg:aspect-[5/3] lg:-mx-9 lg:-mt-7 lg:mb-0">
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
                <h3 className="font-bold uppercase lg:hidden">{car.acf.nazvanie_avto}</h3>
              )}
              <span className="font-normal text-[#f6f6f675] lg:hidden">{kuzovName}</span>
            </div>
          </div>
          <ArrowIcon className={`${isOpen ? '' : 'rotate-180'} transition lg:hidden`} />
        </div>

        {showCost && (
          <div
            className={`
              overflow-hidden transition-all duration-500
              ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              lg:max-h-full lg:opacity-100 mt-4
            `}
          >
            <h3 className="text-[20px]/[28px] lg:text-[24px]/[32px] font-bold mb-4 lg:mb-5">Расчет стоимости</h3>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg">
              <div className="flex justify-between mb-[6px] lg:mb-[10px]">
                <div>Продолжительность</div>
                <div className="text-white-card">{daysCount} {daysCount === 1 ? 'день' : 'дней'}</div>
              </div>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg">
              <div className="flex justify-between my-[6px] lg:my-[10px]">
                <div>Цена за сутки{hasSeasonDays && <span className="text-[#f6f6f666]"> (Сезон)</span>}</div>
                <div className="text-white-card">{pricePerDay} ₽/сут.</div>
              </div>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg">
              <div className="flex justify-between my-[6px] lg:my-[10px]">
                <div>Залог</div>
                <div className="text-white-card">10 000 ₽</div>
              </div>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg">
              <div className="flex justify-between my-[6px] lg:my-[10px]">
                <div>Пробег</div>
                <div className="text-white-card">6 км.</div>
              </div>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg">
              <div className="flex justify-between my-[6px] lg:my-[10px]">
                <div>Перепробег за 1 км</div>
                <div className="text-white-card">6 ₽/км.</div>
              </div>
            </div>

            {additionalOptions
              .filter((opt) => additionalOptionsSelected.includes(opt.value))
              .map((opt) => (
                <div
                  key={opt.value}
                  className="flex justify-between my-[6px] lg:my-[10px] border-b border-[#f6f6f638] text-sm lg:text-lg"
                >
                  <div>{opt.label}</div>
                  <div className="text-white-card">{opt.price ?? 0} ₽</div>
                </div>
              ))}

            {deliveryOptionSelected !== 'none' && (
              <div className="flex justify-between my-[6px] lg:my-[10px] border-b border-[#f6f6f638] text-sm lg:text-lg">
                <div>Доставка</div>
                <div className="text-white-card">{deliveryCost} ₽</div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 lg:mt-9">
              <span className="font-bold text-[16px]/[24px] lg:text-[24px]/[32px]">
                Итого:
                {hasSeasonDays && (
                  <div className="flex font-semibold items-center gap-2 text-[10px]/[18px] lg:text-[12px]/[18px]">
                    с учетом сезонности <LineIcon />
                    <Tooltip placement="right" title={tooltipText} color="#4b5563" arrow={false}>
                      <div><InfoIcon /></div>
                    </Tooltip>
                  </div>
                )}
              </span>
              <span className="font-bold text-2xl lg:text-4xl">{totalPrice} ₽</span>
            </div>
          </div>
        )}
      </div>

      <RentalPeriod
        car={car}
        startDate={startDate}
        onStartDateChange={setStartDate}
        startTime={startTime}
        onStartTimeChange={setStartTime}
        returnDate={returnDate}
        onReturnDateChange={setReturnDate}
        returnTime={returnTime}
        onReturnTimeChange={setReturnTime}
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
  );
};
