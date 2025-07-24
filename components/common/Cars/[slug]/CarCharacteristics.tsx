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
            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                <dt>Двигатель</dt>
                <dd className="font-bold">{taxonomyValues.dvigatel || '—'}</dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                <div>Объем двигателя</div>
                <dd className="font-bold">{car.acf?.engine_volume || '—'}</dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                    <div>Мощность двигателя</div>
                    <dd className="font-bold">
                        {taxonomyValues.moschnost || '—'}
                    </dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                    <div>Расход топлива</div>
                    <dd className="font-bold"> {car.acf?.fuel_flow || '—'}</dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                    <div>Тип привода</div>
                    <dd className="font-bold">
                        {taxonomyValues.privod || '—'}
                    </dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                    <div>Количество пассажиров</div>
                    <dd className="font-bold"> {car.acf?.passengers || '—'}</dd>
            </div>

            <div className="text-sm border-b border-[#f6f6f638] lg:text-lg flex justify-between py-[6px] lg:py-[10px]">
                    <div>Коробка передач</div>
                    <dd className="font-bold">
                        {taxonomyValues.korobka || '—'}
                    </dd>
            </div>
        </dl>
    );
};
