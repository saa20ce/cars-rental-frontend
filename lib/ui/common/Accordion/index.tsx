'use client';

import React, { ReactNode } from 'react';
import { Collapse } from 'antd';
import { ArrowCollapseIcon } from '@/lib/ui/icons/ArrowCollapseIcon';
import './index.css';
import { rawFaqItems } from '@/lib/data/faqItems';

export const Accordion = ({
    items,
}: {
    items?: {
        key: string;
        label: ReactNode;
        children: ReactNode;
        className: string;
    }[];
}) => {
    return (
        <Collapse
            accordion
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
                <ArrowCollapseIcon
                    className={`transition-transform ${isActive ? '' : 'rotate-180'}`}
                />
            )}
            items={items}
            className={`faqCollapse text-[16px] leading-[24px] font-medium lg:text-[18px] lg:leading-[28px]`}
            ghost
        />
    );
};
