import React from 'react';
import { LogoFull } from '@/lib/ui/icons';
import Link from 'next/link';
import type { WPMenuType, AntdMenuItem } from '@/lib/types/Menu';
import { fetchMenuItems } from '@/lib/api/fetchMenu';
import {
  buildMenuTree,
  convertToAntdMenuItems,
} from '@/lib/helpers/menuHelpers';
import NavbarClient from './NavbarClient';
import NavbarMobileClient from './NavbarMobileClient';
import ModalTrigger from '../../Modal/ModalTrigger';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export const Navbar = async () => {
  const data: WPMenuType[] | null = await fetchMenuItems(`${WP_API_URL}/menu`);

  let antdItems: AntdMenuItem[] = [];
  if (data) {
    const tree = buildMenuTree(data);
    antdItems = convertToAntdMenuItems(tree);
  }

  return (
    <div className="sticky top-[10px] z-50 flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full lg:py-[7px] lg:px-6 lg:rounded-3xl my-3  lg:my-5 ">
      <Link href="/">
        <LogoFull />
      </Link>

      <div className="hidden lg:flex w-[75%]">
        <NavbarClient menuItems={antdItems} />
      </div>

      <div className="flex items-center gap-6">
        <ModalTrigger isHeader={true} className='hidden xl:flex'/>
        <div className="lg:hidden">
          <NavbarMobileClient menuItems={antdItems} />
        </div>
      </div>
    </div>
  );
};
