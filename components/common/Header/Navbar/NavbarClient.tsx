'use client';

import React from 'react';
import { Menu, ConfigProvider } from 'antd';
import { ChevronDownIcon } from '@/lib/ui/icons';
import type { MenuProps } from 'antd';
import './NavbarClient.css';

export type AntdMenuItem = {
    key: string;
    label: React.ReactNode;
    children?: AntdMenuItem[];
};

interface NavbarClientProps {
    menuItems: AntdMenuItem[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ menuItems }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemBg: 'transparent',
                        activeBarBorderWidth: 0,
                        activeBarHeight: 0,
                        lineWidth: 0,
                        lineHeight: 0,
                        groupTitleColor: '#fff',
                        popupBg: '#284152',
                        horizontalItemSelectedColor: '#f6f6f666',
                        itemHoverBg: '#516573',
                        itemActiveBg: '#516573',
                        fontFamily: '"lato", "lato Fallback"',
                        itemMarginBlock: 0,
                        itemHeight: 36,
                        itemBorderRadius: 8,
                    },
                },
                token: {
                    colorText: '#F6F6F6',
                    fontSize: 16,
                },
            }}
        >
            <Menu
                mode="horizontal"
                className="custom-menu"
                items={menuItems as unknown as MenuProps['items']}
                expandIcon={<ChevronDownIcon className="w-3 h-6" />}
                style={{ flex: 'auto', minWidth: 0, justifyContent: 'center' }}
            />
        </ConfigProvider>
    );
};

export default NavbarClient;
