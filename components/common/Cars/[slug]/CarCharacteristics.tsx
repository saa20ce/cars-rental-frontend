'use client';

import React from 'react';
import { Car } from '@/lib/types/Car';

interface CarCharacteristicsProps {
    car: Car;
    taxonomyValues: Record<string, string>;
}

export const CarCharacteristics: React.FC<CarCharacteristicsProps> = ({
    car,
    taxonomyValues,
}) => {
    return (
        <dl className="px-2 lg:px-0">
            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] font-normal border-b border-[#f6f6f638] flex justify-between py-[6px] lg:pt-[10px]">
                <dt>Двигатель</dt>
                <dd className="font-bold">{taxonomyValues.dvigatel || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Объем двигателя</dt>
                <dd className="font-bold">{car.acf?.engine_volume || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Мощность двигателя</dt>
                <dd className="font-bold">{taxonomyValues.moschnost || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Расход топлива</dt>
                <dd className="font-bold"> {car.acf?.fuel_flow || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Тип привода</dt>
                <dd className="font-bold">{taxonomyValues.privod || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Количество пассажиров</dt>
                <dd className="font-bold"> {car.acf?.passengers || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Коробка передач</dt>
                <dd className="font-bold">{taxonomyValues.korobka || '—'}</dd>
            </div>
        </dl>
    );
};
