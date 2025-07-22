import React from 'react';
import Link from 'next/link';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';
import CustomButton from '@/lib/ui/common/Button';

interface CarCardProps {
  car: LibCar;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };

  const imageUrl =
    (Array.isArray(acf.white_gallery) && acf.white_gallery[0]) ||
    (Array.isArray(acf.black_gallery) && acf.black_gallery[0]) ||
    (Array.isArray(acf.gray_gallery) && acf.gray_gallery[0]) ||
    (Array.isArray(acf.blue_gallery) && acf.blue_gallery[0]) ||
    (Array.isArray(acf.red_gallery) && acf.red_gallery[0]) ||
    '';

  const carLink = `/cars/${car.slug}`;

  return (
    <div className="car-card flex flex-col bg-[#f6f6f60e] rounded-2xl ">
      <Link href={carLink} passHref className="contents">
        <img
          src={imageUrl}
          alt={acf.nazvanie_avto}
          className="w-full min-w-[310px] h-3/4 max-h-[207px] object-cover mb-[14px] rounded-2xl lg:max-h-[252px] lg:mb-4"
        />
      </Link>

      <div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
        <div className="w-full">
          <Link href={carLink} passHref>
            <div className="text-lg font-semibold text-[#f6f6f6]">
              {acf.nazvanie_avto}
            </div>
          </Link>
          <div className="text-xl font-semibold text-[#f6f6f6] ">
            {acf['30_dnej']} ₽/сут.
          </div>
        </div>

        <div className="flex flex-col justify-center w-[103px] lg:justify-end">
          <CustomButton
            variant="default"
            style={{ height: '40px' }}
            className="font-medium hover:bg-[#f6f6f6] w-[103px]"
          >
            Оформить
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
