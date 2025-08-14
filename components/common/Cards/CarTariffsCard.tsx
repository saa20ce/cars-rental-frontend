import React from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';
import { ChevronDownIcon } from '@/lib/ui/icons';

interface CarTariffsCardProps {
    car: LibCar;
    pricePerDay: number;
    totalPrice: number;
    openId: number | null;
    onToggle: (id: number) => void;
}

export const CarTariffsCard: React.FC<CarTariffsCardProps> = ({
    car,
    pricePerDay,
    totalPrice,
    openId,
    onToggle,
}) => {
    
    const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };
    const imageUrl =
        acf.white_gallery?.[0] ||
        acf.black_gallery?.[0] ||
        acf.gray_gallery?.[0] ||
        acf.blue_gallery?.[0] ||
        acf.red_gallery?.[0] ||
        '';

    const carLink = `/cars/${car.slug}`;

    const headerRow = (
        <button
            className="flex items-center justify-between py-3 px-4 cursor-pointer text-[12px]/[16px] lg:text-[16px]/[24px] border-b border-[#F6F6F633]"
            onClick={() => onToggle(car.id)}
        >
            <div className="font-medium text-[#f6f6f6]">
                {acf.nazvanie_avto}
            </div>
            <div className="lg:w-1/2 flex pl-[12px] gap-2 lg:gap-0 items-center">
                <div className="w-[60px] lg:w-1/2 text-center">
                    {pricePerDay.toLocaleString()} ₽
                </div>
                <div className="pr-2 lg:pr-0  lg:w-1/2 text-center">
                    <span> {totalPrice.toLocaleString()} ₽</span>
                </div>
                <ChevronDownIcon className="w-[12px] h-[9px]" active />
            </div>
        </button>
    );

    if (openId === car.id) {
        return (
            <div className="car-card flex flex-col rounded-2xl py-2 lg:y-3">
                <div
                    className="flex items-center  justify-between py-3 px-4 cursor-pointer text-[12px]/[16px] lg:text-[16px]/[24px] rounded-t-[20px] bg-[#F6F6F633]"
                    onClick={() => onToggle(car.id)}
                >
                    <Link href={carLink} passHref className="w-1/2">
                        <div className="font-medium text-[#f6f6f6]">
                            {acf.nazvanie_avto}
                        </div>
                    </Link>
                    <div className="lg:w-1/2 flex pl-[12px] items-center">
                        <div className="w-[60px] lg:w-1/2 text-center">
                            {pricePerDay.toLocaleString()} ₽
                        </div>
                        <div className="w-[122px] pr-3 lg:pr-0  lg:w-1/2 text-center">
                            <span> {totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <ChevronDownIcon
                            className="w-[12px] h-[9px] rotate-[180deg]"
                            active
                        />
                    </div>
                </div>

                <div className="flex gap-3 lg:gap-6 p-4 lg:py-[26px] lg:px-6 bg-[#f6f6f60e] rounded-b-2xl ">
                    <Link href={carLink} passHref className="contents">
                        <img
                            src={imageUrl}
                            alt={acf.nazvanie_avto}
                            className="max-w-[168px] lg:max-w-[188px] object-cover rounded-2xl aspect-[2/1]"
                        />
                    </Link>
                    <div className="flex flex-col gap-[14px] justify-between lg:justify-start min-w-[123px] max-w-[402px]">
                        <p className="text-[14px]/[20px] font-normal hidden lg:block">
                            Для аренды автомобиля в Рентасиб необходимы
                            следующие документы: паспорт, водительское
                            удостоверение.
                        </p>

                        <div className="flex flex-col lg:flex-row gap-3">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: '#f6f6f60e',
                                            defaultBorderColor: 'transparent',
                                            defaultColor: '#f6f6f6',
                                            contentFontSize: 16,
                                            controlHeight: 42,
                                            textHoverBg: '#f6f6f6',
                                            colorPrimaryHover: '#f6f6f6',
                                            colorBorderSecondary: '#f6f6f60e',
                                            colorBorderBg: '#f6f6f60e',
                                            colorBgContainer: '#3c6e71',
                                            colorPrimaryBorderHover:
                                                '#f6f6f60e',
                                            defaultHoverBorderColor:
                                                '#f6f6f60e',
                                            defaultActiveBorderColor:
                                                '#f6f6f60e',
                                            defaultActiveColor: '#f6f6f6',
                                            colorBorder: '#f6f6f60e',
                                            colorBgTextActive: '#3c6e71',
                                            borderRadius: 12,
                                        },
                                    },
                                }}
                            >
                                <Button block style={{ height: '40px' }}>
                                    <span className="mt-[-1px]">Подробнее</span>
                                </Button>
                            </ConfigProvider>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: '#3c6e71',
                                            defaultBorderColor: '#3c6e71',
                                            defaultColor: '#f6f6f6',
                                            contentFontSize: 16,
                                            controlHeight: 42,
                                            textHoverBg: '#f6f6f6',
                                            colorPrimaryHover: '#f6f6f6',
                                            colorBorderSecondary: '#3c6e71',
                                            colorBorderBg: '#3c6e71',
                                            colorBgContainer: '#3c6e71',
                                            colorPrimaryBorderHover: '#3c6e71',
                                            defaultHoverBorderColor: '#3c6e71',
                                            defaultActiveBorderColor: '#3c6e71',
                                            defaultActiveColor: '#f6f6f6',
                                            colorBorder: '#3c6e71',
                                            colorBgTextActive: '#3c6e71',
                                            borderRadius: 12,
                                        },
                                    },
                                }}
                            >
                                <Button block style={{ height: '40px' }}>
                                    <span className="mt-[-1px]">
                                        Арендовать
                                    </span>
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return headerRow;
};
