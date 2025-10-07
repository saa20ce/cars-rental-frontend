'use client';

import React from 'react';
import type { PriceRange } from '@/lib/types/Car';
import { Switch, Tooltip } from 'antd';
import { LineIcon, InfoIcon } from '@/lib/ui/icons';

interface PriceCardsProps {
    priceRanges: PriceRange[];
    seasonModeSwitch: boolean;
}

export const tooltipText = (
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
        <>
            <section>
                <div className="flex items-center gap-2 lg:gap-[10px] mt-5 ml-2 lg:ml-6">
                    <Switch checked={seasonModeSwitch} className="custom-switch" />
                    <style jsx global>{`
                    .ant-switch,
                    .ant-switch:hover:not(.ant-switch-disabled) {
                        background-color: #f6f6f675;
                    }

                    .ant-switch.ant-switch-checked,
                    .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
                        background-color: #3c6e71;
                    }

                    .ant-tooltip .ant-tooltip-inner {
                        padding: 8px 10px;
                    }

                    .custom-switch {
                        width: 56px !important;
                        height: 28px !important;
                    }

                    .custom-switch .ant-switch-handle {
                        width: 20px !important;
                        height: 20px !important;
                        top: 4px !important;
                        left: 4px !important;
                    }

                    .custom-switch.ant-switch-checked .ant-switch-handle {
                        left: calc(100% - 20px - 4px) !important; 
                    }
                    `}</style>
                    <span className="text-[16px]/[24px] lg:text-[20px]/[28px] font-normal">Сезон</span>
                    <LineIcon />
                    <Tooltip
                        title={tooltipText}
                        color="#4b5563"
                        arrow={false}

                    >
                        <div>
                            <InfoIcon />
                        </div>
                    </Tooltip>
                </div>

                <div className="-mx-4 lg:mx-0 mt-4 overflow-x-auto lg:overflow-visible scrollbar-hide">
                    <ul
                        className="flex gap-3 min-w-max px-4 lg:px-0 lg:grid lg:gap-3 lg:w-full"
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(150px, 1fr))',
                        }}
                    >
                        {priceRanges.map(
                            ({ baseKey, label, price, seasonPrice }) => {
                                const finalPrice = seasonModeSwitch
                                    ? seasonPrice
                                    : price;
                                return (
                                    <li
                                        key={baseKey}
                                        className={`flex flex-col rounded-lg px-3 py-[6px] justify-between transition-all lg:text-lg lg:min-h-[80px] lg:justify-center lg:m-0 lg:px-4 lg:py-3 min-w-[112px]
                                            ${seasonModeSwitch ? 'bg-[#f6f6f638]' : 'bg-[#f6f6f60e]'}
                                        `}
                                    >
                                        <h3
                                            className={`text-[14px]/[20px] lg:text-[18px]/[28px] font-normal transition-all ${seasonModeSwitch
                                                ? 'text-[#f6f6f6]'
                                                : 'text-[#f6f6f666]'
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
                            },
                        )}
                    </ul>
                </div>
            </section>

        </>
    );
};
