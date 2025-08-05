'use client';

import React, { useMemo } from 'react';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CustomSelect } from '@/lib/ui/common/Select/CustomSelect';
import { InfoIcon, LineIcon } from '@/lib/ui/icons';
import './AdditionalServices.css';

interface AdditionalServicesProps {
    additionalOptions: { label: string; value: string }[];
    additionalOptionsSelected?: string[];
    setAdditionalOptions?: (values: string[]) => void;
    deliveryOptions?: { label: string; value: string }[];
    deliveryOptionSelected?: string;
    setDeliveryOption: (value: string) => void;
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
    additionalOptions,
    additionalOptionsSelected = [],
    setAdditionalOptions = () => {},
    deliveryOptions = [],
    deliveryOptionSelected,
    setDeliveryOption,
}) => {
    const optionsWithNoDelivery = [
        { label: 'Без подачи', value: 'none' },
        ...deliveryOptions,
    ];

    return (
        <div>
            <div className="additional-service-block">
                <h4 className="ltext-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mt-[14px] flex items-center gap-2 ">
                    Место подачи и возврата:
                </h4>
                <div className="flex gap-2 w-full mt-[10px]">
                    <CustomSelect
                        options={optionsWithNoDelivery}
                        onChange={(value) => setDeliveryOption(value as string)}
                        value={deliveryOptionSelected || undefined}
                        placeholder="Выберите место подачи"
                        listHeight={232}
                        style={{ width: '100%', height: '36px' }}
                    />
                </div>
            </div>

            <div className="mt-3">
                <h4 className="text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold mb-[10px] lg:mb-3">
                    Опции:
                </h4>
                <div className="flex flex-wrap gap-[10px]  lg:flex-col lg:gap-3 lg:text-lg">
                    <CheckboxGroup
                        className="gap-4"
                        options={additionalOptions.map((opt) => ({
                            label: opt.label,
                            value: opt.value,
                        }))}
                        value={additionalOptionsSelected}
                        onChange={(values) =>
                            setAdditionalOptions(values as string[])
                        }
                    />
                </div>
            </div>
        </div>
    );
};
