'use client';

import React, { useEffect, useState } from 'react';
import { ConfigProvider, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import { CalendarIcon } from '@/lib/ui/icons';

export type CustomDatePickerProps = DatePickerProps & {
    width?: string | number;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    width = '100%',
    onOpenChange,
    style,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

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
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    colorBgElevated: '#284152',
                    colorText: '#f6f6f6',
                    colorTextDisabled: '#f6f6f675',
                    colorIcon: '#f6f6f6',
                    colorPrimary: '#f6f6f6',
                    controlItemBgActive: '#f6f6f60e',
                    colorTextLightSolid: '#284b63',
                },
                components: {
                    DatePicker: {
                        cellHoverBg: '#284b63',
                        activeBorderColor: '#f6f6f675',
                        cellActiveWithRangeBg: '#284b63',
                        paddingInline: 16,
                        borderRadius: isMobile ? 12 : 16
                    },
                },
            }}
        >
            <DatePicker
                format={isMobile ? 'D MMMM' : 'D MMM'}
                inputReadOnly
                allowClear={false}
                suffixIcon={<CalendarIcon active={isOpen} />}
                onOpenChange={handleOpenChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    width,
                    backgroundColor: '#f6f6f638',
                    border: isFocused
                        ? '1px solid #f6f6f6'
                        : '1px solid #f6f6f647',
                    height: 36,
                    color: '#f6f6f6',
                    display: 'flex',
                    alignItems: 'center',
                    ...style,
                }}
                {...rest}
            />
            <style jsx global>{`
                .ant-picker-input > input::placeholder {
                    color: #f6f6f666 !important;
                }

                .ant-picker.ant-picker-outlined {
                    border-top-right-radius: 0 !important;
                    border-bottom-right-radius: 0 !important;
                }

            `}</style>
        </ConfigProvider>
    );
};
