import { LogoFull } from '@/lib/ui/icons';
import Link from 'next/link';
import NavbarClient from './NavbarClient';
import NavbarMobileClient from './NavbarMobileClient';
import ModalTrigger from '../../Modal/ModalTrigger';
import { mainMenu } from '@/lib/data/mainMenu';

export const Navbar = async () => {
    return (
        <div className="sticky top-[10px] z-50 flex justify-between items-center bg-[#284b63] py-4 px-5 rounded-full lg:py-[10px] lg:px-6 lg:rounded-3xl my-3  lg:my-5 lg:min-h-[60px]">
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
