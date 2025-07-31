'use client';

import React from 'react';
import { Collapse } from 'antd';
import { ArrowCollapseIcon } from '@/lib/ui/icons/ArrowCollapseIcon';
import './index.css';
import { rawFaqItems } from '@/lib/data/faqItems';

const faqItems = rawFaqItems.map((item, index) => ({
    key: String(index + 1),
    label: (
        <span className="text-[#F6F6F6] text-[16px]/[24px] lg:text-[18px]/[28px] font-medium">
            {item.question}
        </span>
    ),
    children: (
        <p className="text-[#F6F6F6] font-normal text-[14px]/[20px] lg:text-[16px]/[24px]">
            {item.answer}
        </p>
    ),
    className: `bg-[#F6F6F60D] border border-[#F6F6F633] rounded-[20px] ${
        index !== rawFaqItems.length - 1 ? 'mb-[10px] lg:mb-[12px]' : ''
    }`,
}));

export const FaqCollapse = () => {
    return (
        <section className="pb-[42px] lg:pb-[68px]">
            <h2 className="text-white text-2xl font-semibold mb-4">
                Часто задаваемые вопросы:
            </h2>
            <Collapse
                accordion
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                    <ArrowCollapseIcon
                        className={`transition-transform ${isActive ? '' : 'rotate-180'}`}
                    />
                )}
                items={faqItems}
                className={`faqCollapse text-[16px] leading-[24px] font-medium lg:text-[18px] lg:leading-[28px]`}
                ghost
            />
        </section>
    );
};
