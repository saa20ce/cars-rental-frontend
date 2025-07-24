import React from 'react';
import { TopHeader } from '@/components/common/Header/TopHeader';
import { Navbar } from '@/components/common/Header/Navbar/Navbar';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';

export default async function Header() {
    return (
        <>
            <header>
                <TopHeader />
            </header>
            <Navbar />
            <Breadcrumbs />
        </>
    );
}
