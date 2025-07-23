'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, ConfigProvider } from 'antd';
import { ChevronRightIcon } from '@/lib/ui/icons';
import { usePathname } from 'next/navigation';
import './Breadcrumbs.css'

export interface BreadcrumbItem {
  href: string;
  title: string;
  isLast: boolean;
}

const fetchBreadcrumbs = async (pathname: string) => {
  const res = await fetch(
    `/api/breadcrumbs?path=${encodeURIComponent(pathname)}`
  );
  return await res.json();
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    fetchBreadcrumbs(pathname).then(setItems);
  }, [pathname]);

  const mappedItems = items.map((item) => ({
    title: item.isLast ? (
      <span
        className="font-normal"
        style={{ fontFamily: '"lato", "lato Fallback"' }}
      >
        {item.title}
      </span>
    ) : (
      <Link
        href={item.href}
        className="font-normal"
        style={{ fontFamily: '"lato", "lato Fallback"' }}
      >
        {item.title}
      </Link>
    ),
  }));

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: '#f6f6f6',
            lastItemColor: '#f6f6f6',
            linkColor: '#f6f6f6',
            linkHoverColor: '#f6f6f6',
            colorBgTextHover: '#1e384a',
          },
        },
      }}
    >
      <Breadcrumb
        items={mappedItems}
        className="custom-breadcrumb bg-[#1e384a] py-[10px] px-5 lg:py-3 lg:px-7 rounded-[24px] text-[16px]/[24px] lg:text-[18px]/[28px] font-normal mb-[12px] lg:mb-5"
        separator={<ChevronRightIcon/>}
      />
    </ConfigProvider>
  );
}
