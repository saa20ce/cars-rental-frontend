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
    const year = car.acf?.year;
    const engineVolume = car.acf?.engine_volume;
    const fuelFlow = car.acf?.fuel_flow;
    const passengers = car.acf?.passengers;

    const privod = taxonomyValues.privod;
    const korobka = taxonomyValues.korobka;
    const moschnost = taxonomyValues.moschnost;
    const dvigatel = taxonomyValues.dvigatel;

    const volumeAndPower =
        [engineVolume && `${engineVolume} л`, moschnost]
            .filter(Boolean)
            .join(' / ') || '—';

    const fuelAndEngine =
        [fuelFlow && `${fuelFlow} л/100 км`, dvigatel]
            .filter(Boolean)
            .join(', ') || '—';

    return (
        <dl className="px-2 lg:px-0">
            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] font-normal border-b border-[#f6f6f638] flex justify-between py-[6px] lg:pt-[10px]">
                <dt>Год выпуска</dt>
                <dd className="font-bold">{year || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Тип привода</dt>
                <dd className="font-bold">{privod || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Коробка передач</dt>
                <dd className="font-bold">{korobka || '—'}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Объем / мощность</dt>
                <dd className="font-bold">{volumeAndPower}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Расход / двигатель</dt>
                <dd className="font-bold">{fuelAndEngine}</dd>
            </div>

            <div className="text-[14px]/[20px] lg:text-[16px]/[24px] border-b border-[#f6f6f638] flex justify-between py-[6px] lg:py-[10px]">
                <dt>Количество пассажиров</dt>
                <dd className="font-bold">{passengers || '—'}</dd>
            </div>
        </dl>
    );
};
