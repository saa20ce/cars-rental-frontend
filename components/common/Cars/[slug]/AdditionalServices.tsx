'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CheckboxGroup = dynamic(
    () => import('antd/lib/checkbox/Group').then(m => m.default || m),
    { ssr: false, loading: () => null }
);
const CustomSelect = dynamic(
    () => import('@/lib/ui/common/Select/CustomSelect').then(m => m.CustomSelect || m),
    { ssr: false, loading: () => null }
);


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
    setAdditionalOptions = () => { },
    deliveryOptions = [],
    deliveryOptionSelected,
    setDeliveryOption,
}) => {
    const optionsWithNoDelivery = [
        { label: 'Без подачи', value: 'none' },
        ...deliveryOptions,
    ];

    return (
        <>
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

            <style jsx global>{`
                            span.ant-checkbox-label {
                                font-family: 'lato', 'lato Fallback';
                            }

                            .ant-checkbox .ant-checkbox-inner {
                                background-color: #f6f6f675 !important;
                                border-color: #f6f6f675 !important;
                                width: 20px !important;
                                height: 20px !important;
                            }

                            .ant-checkbox-wrapper,
                            .ant-picker-input-placeholder > input {
                                color: #f6f6f6 !important;
                            }

                            .ant-checkbox + span {
                                padding-inline-end: 0px;
                            }

                            /* Desktop Checkbox */
                            @media (width >= 64rem) {
                                span.ant-checkbox-label {
                                    font-size: 16px;
                                    height: 22px;
                                }

                                .ant-checkbox-inner,
                                .ant-checkbox-input {
                                    transform: scale(1.01) !important;
                                }
                            }

                            /* Desktop Car single Checkbox */
                            @media (width >= 64rem) {
                                .ant-checkbox .ant-checkbox-inner {
                                    width: 22px;
                                    height: 22px;
                                }

                                .ant-checkbox .ant-checkbox-inner:after {
                                    width: 5.714286px;
                                    height: 14.142857px;
                                    top: 42%;
                                }
                            }
                        `}</style>
        </>
    );
};
