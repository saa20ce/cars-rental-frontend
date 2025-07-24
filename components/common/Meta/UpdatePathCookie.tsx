'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function UpdatePathCookie() {
    const pathname = usePathname();
    React.useEffect(() => {
        document.cookie = `pathname=${pathname}; path=/`;
    }, [pathname]);
    return null;
}
