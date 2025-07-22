'use client';

import React from 'react';
import type { PriceRange } from '@/lib/types/Car';
import { Switch, Tooltip } from 'antd';
import { LineIcon, InfoIcon } from '@/lib/ui/icons';

interface PriceCardsProps {
  priceRanges: PriceRange[];
  seasonModeSwitch: boolean;
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

export const PriceCards: React.FC<PriceCardsProps> = ({
  priceRanges,
  seasonModeSwitch,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-5 lg:ml-6 lg:text-lg">
        <Switch checked={seasonModeSwitch} />
        <span className="lg:mt-[4px]">Сезон</span>
        <LineIcon />
        <Tooltip
          placement="right"
          title={tooltipText}
          color="#4b5563"
          arrow={false}
        >
          <div>
            <InfoIcon />
          </div>
        </Tooltip>
      </div>

      <div className="mt-4 overflow-x-auto lg:overflow-visible scrollbar-hide">
        <ul
          className="
            flex gap-3 min-w-max
            lg:grid lg:gap-3 lg:w-full
          "
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          }}
        >
          {priceRanges.map(({ baseKey, label, price, seasonPrice }) => {
            const finalPrice = seasonModeSwitch ? seasonPrice : price;
            return (
              <li
                key={baseKey}
                className={`flex flex-col rounded-lg px-3 py-[6px] justify-between transition-all lg:text-lg lg:min-h-[80px] lg:justify-center lg:m-0 lg:px-4 lg:py-3 min-w-[112px]
                ${seasonModeSwitch ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'}
              `}
              >
                <h3
                  className={`text-[14px]/[20px] lg:text-[18px]/[28px] font-normal transition-all ${
                    seasonModeSwitch ? 'text-[#f6f6f6]' : 'text-[#f6f6f666]'
                  }`}
                >
                  {label}
                </h3>
                <p
                  className={`text-[14px]/[20px] lg:text-[18px]/[28px] font-bold transition-all`}
                >
                  {finalPrice > 0
                    ? `${finalPrice.toLocaleString()} ₽/сут.`
                    : '—'}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};