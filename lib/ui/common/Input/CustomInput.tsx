import React from 'react';
import { ConfigProvider, Input } from 'antd';
import type { InputProps } from 'antd';

export const CustomInput: React.FC<InputProps> = (props) => (
    <ConfigProvider
        theme={{
            components: {
                Input: {
                    colorTextPlaceholder: '#f6f6f666',
                    hoverBorderColor: '#f6f6f638',
                    activeBg: '#f6f6f638',
                    addonBg: '#f6f6f638',
                    hoverBg: '#f6f6f638',
                    paddingInline: 16,
                },
            },
        }}
    >
        <Input
            {...props}
            className={`bg-[#f6f6f638] text-[#f6f6f6] border-0 rounded-xl h-9 lg:h-12 lg:text-base ${props.className || ''}`}
        />
    </ConfigProvider>
);
