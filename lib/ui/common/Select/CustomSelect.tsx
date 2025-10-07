'use client';

import React, { useEffect, useState } from 'react';
import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import { ChevronDownIcon } from '@/lib/ui/icons';

export type CustomSelectProps = SelectProps<unknown> & { multiple?: boolean };

export const CustomSelect: React.FC<CustomSelectProps> = ({
    multiple = false,
    ...rest
}) => {
    const [isSelectActive, setIsSelectActive] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: '#284152',
                    },
                    components: {
                        Select: {
                            selectorBg: '#f6f6f638',
                            activeBorderColor: '#f6f6f6',
                            hoverBorderColor: '#f6f6f647',
                            colorBorder: '#f6f6f647',
                            colorTextPlaceholder: '#f6f6f675',
                            borderRadius: isMobile ? 12 : 16,
                            fontSizeIcon: 18,
                            fontFamily: '"lato", "lato Fallback"',
                            colorText: '#f6f6f6',
                            optionActiveBg: '#516573',
                            optionPadding: '8px 16px',
                            optionFontSize: 18,
                            optionSelectedBg: '#516573',
                            fontSize: 16,
                        },
                    },
                }}
            >
                {multiple ? (
                    <Select
                        mode="multiple"
                        showSearch={false}
                        maxTagCount={0}
                        maxTagPlaceholder={(omittedValues) =>
                            omittedValues.length
                                ? `Выбрано: ${omittedValues.length}`
                                : ''
                        }
                        className="flex items-center lg:h-[44px!important]"
                        suffixIcon={<ChevronDownIcon active={isSelectActive} />}
                        style={{
                            width: '50%',
                            height: 36,
                        }}
                        onFocus={() => setIsSelectActive(true)}
                        onBlur={() => setIsSelectActive(false)}
                        {...rest}
                    />
                ) : (
                    <Select
                        className="flex items-center lg:h-[44px!important]"
                        suffixIcon={<ChevronDownIcon active={isSelectActive} />}
                        style={{
                            width: '50%',
                            height: 36,
                        }}
                        onFocus={() => setIsSelectActive(true)}
                        onBlur={() => setIsSelectActive(false)}
                        {...rest}
                    />
                )}
            </ConfigProvider>
            <style jsx global>{`
            /* Mobile Car single select */
            .ant-select {
                position: relative;
            }

            .ant-select .ant-select-arrow {
                height: 21px;
                right: 20px;
            }

            .ant-select-selector {
                padding-left: 16px !important;
            }

            .ant-select-dropdown {
                padding: 6px;
            }

            /* Desktop Car single select */
            @media (width >= 64rem) {
                span.ant-select-selection-placeholder {
                    height: 25px;
                    font-size: 18px;
                }

                .ant-select-selector {
                    padding-left: 12px !important;
                }

                .ant-select .ant-select-arrow {
                    right: 22px;
                }

                .ant-select-focused .ant-select-selector {
                    box-shadow: none !important;
                    border: 1px solid #f6f6f6 !important;
                }

                .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
                    height: 29px;
                }
            }

            /* Mobile Car single Timepicker */
            .timePicker.ant-select {
                width: 44% !important;
            }

            .ant-select .ant-select-selector {
                font-size: 14px !important;
            }

            .ant-select-dropdown .ant-select-item {
                font-size: 16px !important;
            }

            .timePicker .ant-select-selector {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                margin-bottom: 8;
                padding: 0px 16px 0px 16px !important;
                padding-right: 20;
                height: 36 !important;
                color: #f6f6f6;
            }

            .timePicker.ant-select .ant-select-arrow {
                height: 14px !important;
            }

            /* Desktop Car single Datepicker */
            @media (width >= 64rem) {
                .ant-picker.datePicker {
                    padding: 0px 20px 0px 20px !important;
                }
            }

            /* Desktop Car single Timepicker */
            @media (width >= 64rem) {
                .ant-picker,
                .timePicker .ant-select-selector,
                .ant-select {
                    height: 44px !important;
                }

                .timePicker .ant-select-selector {
                    padding: 0px 20px 0px 20px !important;
                }

                .ant-select-single.ant-select-open .ant-select-arrow svg {
                    fill-opacity: 1 !important;
                }

                .ant-select-selection-item,
                .ant-select-selection-overflow {
                    padding-top: 3px !important;
                }

                .ant-picker .ant-picker-input > input,
                .timePicker.ant-select .ant-select-selector {
                    font-size: 16px;
                }

                .timePicker.ant-select .ant-select-arrow {
                    height: 18px !important;
                }
            }

            .filters-select .ant-select-selector {
                padding: 0 12px !important;
            }

            /* Desktop select group */
            @media (width >= 64rem) {
                .select-group .ant-select:first-child .ant-select-selector {
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }

                .select-group
                    .ant-select:not(:first-child):not(:last-child)
                    .ant-select-selector {
                    border-radius: 0px;
                }

                .select-group .ant-select:last-child .ant-select-selector {
                    border-top-right-radius: 16px;
                    border-bottom-right-radius: 16px;
                    border-top-left-radius: 0px;
                    border-bottom-left-radius: 0px;
                }
            }

            .ant-select-multiple .ant-select-selection-wrap {
                align-self: center;
            }

            /* Сам текст-счётчик */
            .ant-select-multiple .ant-select-selection-overflow-item {
                padding: 0;
                margin: 0;
            }

            .ant-select-multiple
                .ant-select-selection-overflow-item
                .ant-select-selection-item {
                background: none !important;
                border: none !important;
                padding: 0 !important;
                font-size: 14px;
                color: #f6f6f6;
            }

            @media (width >= 64rem) {
                .ant-select-multiple
                    .ant-select-selection-overflow-item
                    .ant-select-selection-item {
                    font-size: 14px;
                }
            }
            `}</style>
        </>
    )
}