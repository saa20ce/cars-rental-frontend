import React from 'react';
import { TopHeader } from '@/components/common/Header/TopHeader';
import { Navbar } from '@/components/common/Header/Navbar/Navbar';

export default async function Header() {
    return (
        <>
            <header>
                <TopHeader />
            </header>
            <Navbar />
        </>
    );
}
