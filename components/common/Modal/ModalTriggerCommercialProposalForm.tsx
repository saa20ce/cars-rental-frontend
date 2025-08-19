'use client';

import { useState } from 'react';
import CommercialProposalForm from '../Form/CommercialProposalForm';

export default function ModalTriggerCommercialProposalForm({
    klassOptions,
}: {
    klassOptions: {
        value: string;
        label: string;
    }[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-[18px]/[28px] font-semibold bg-[#3C6E71] rounded-[16px] w-full max-w-[371px] h-11 text-center"
            >
                Запросить коммерческое предложение
            </button>

            <CommercialProposalForm
                klassOptions={klassOptions}
                isOpen={isOpen}
                setIsOpenAction={setIsOpen}
            />
        </>
    );
}
