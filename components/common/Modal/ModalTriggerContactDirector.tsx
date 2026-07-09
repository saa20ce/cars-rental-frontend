
'use client';

import dynamic from 'next/dynamic';

const ContactDerictorForm = dynamic(
    () => import('../Form/ContactDerictorForm'),
    {
        ssr: false,
        loading: () => null,
    },
);

export default function ModalTriggerContactDirector({
    isOpen,
    setIsOpenAction
}: {
    isOpen: boolean;
    setIsOpenAction: (open: boolean) => void
}) {
    return (
        <>
            <button
                onClick={() => setIsOpenAction(true)}
                className="block w-[calc(100%-14px)] px-[12px] lg:px-4 py-2 lg:mx-[7px] lg:hover:bg-[#F6F6F633] hover:text-[#F6F6F6] rounded-md text-[16px]/[24px] text-normal text-nowrap text-left"
            >
                Связь с директором
            </button>

            {isOpen && (
                <ContactDerictorForm
                    isOpen={isOpen}
                    setIsOpenAction={setIsOpenAction}
                />
            )}
        </>
    );
}
