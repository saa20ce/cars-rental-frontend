'use client';

import { LogoFull } from '@/lib/ui/icons';
import Link from 'next/link';
import NavbarClient from './NavbarClient';
import NavbarMobileClient from './NavbarMobileClient';
import ModalTrigger from '../../Modal/ModalTrigger';
import { mainMenu } from '@/lib/data/mainMenu';
import { useEffect, useRef, useState } from 'react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const navbarEl = navbarRef.current;
        if (!navbarEl) return;

        const offsetTop = navbarEl.offsetTop;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > offsetTop);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`sticky top-0 z-50 flex justify-between items-center bg-[#284b63] py-4 px-5  lg:py-[10px] lg:px-6 my-3  lg:my-5 lg:min-h-[60px] transition-all duration-200 ${
                isScrolled
                    ? ' rounded-b-3xl lg:rounded-b-3xl'
                    : 'rounded-[100px] lg:rounded-3xl'
            }`}
            ref={navbarRef}
        >
            <Link href="/">
                <LogoFull />
            </Link>

            <NavbarClient menuItems={mainMenu} />

            <div className="flex items-center gap-6">
                <ModalTrigger isHeader={true} className="hidden xl:flex" />
                <div className="lg:hidden">
                    <NavbarMobileClient menuItems={mainMenu} />
                </div>
            </div>
        </div>
    );
};
