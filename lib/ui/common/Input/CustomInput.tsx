import React, { useEffect, useState } from 'react';
import { ConfigProvider, Input } from 'antd';
import type { InputProps } from 'antd';

export const CustomInput: React.FC<InputProps> = (props) => {

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
            theme={{
                components: {
                    Input: {
                        borderRadius: isMobile ? 12 : 16,
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
                className={`bg-[#f6f6f638!important] text-[#f6f6f6] border-0 rounded-[12px] lg:rounded-[16px] h-[36px] lg:h-[44px] lg:text-base ${props.className || ''}`}
            />
        </ConfigProvider>
    );
}
