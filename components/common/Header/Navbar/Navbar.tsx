import React from 'react';
import { LogoFull, PhoneIcon, PhoneIconDefault } from '@/lib/ui/icons';
import Link from 'next/link';
// import { ConfigProvider, Button } from 'antd';
import type { WPMenuType, AntdMenuItem } from '@/lib/types/Menu';
import { fetchMenuItems } from '@/lib/api/fetchMenu';
import {
  buildMenuTree,
  convertToAntdMenuItems,
} from '@/lib/helpers/menuHelpers';
import NavbarClient from './NavbarClient';
import NavbarMobileClient from './NavbarMobileClient';
import CustomButton from '@/lib/ui/common/Button';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export const Navbar = async () => {
  const data: WPMenuType[] | null = await fetchMenuItems(`${WP_API_URL}/menu`);

  let antdItems: AntdMenuItem[] = [];
  if (data) {
    const tree = buildMenuTree(data);
    antdItems = convertToAntdMenuItems(tree);
  }

  return (
    <div className="flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full lg:py-[7px] lg:px-6 lg:rounded-3xl">
      <Link href="/">
        <LogoFull />
      </Link>

      <div className="flex items-center gap-6 lg:hidden">
        <PhoneIcon />
        <NavbarMobileClient menuItems={antdItems} />
      </div>

      <div className="hidden lg:flex w-[75%]">
        <NavbarClient menuItems={antdItems} />
      </div>

      <div className="hidden lg:flex w-auto">
        <CustomButton
          variant="outlined"
          icon={<PhoneIconDefault />}
          className="hidden xl:flex"
          style={{ height: 40, width: 169 }}
        >
          Заказать звонок
        </CustomButton>
        {/* <Button
            className="hidden xl:flex"
            variant="outlined"
            icon={<PhoneIconDefault />}
            style={{ height: 40, width: 169 }}
            ghost
          >
            Заказать звонок
          </Button> */}
        <div className="xl:hidden">
          <PhoneIcon />
        </div>
      </div>
    </div>
  );
};
