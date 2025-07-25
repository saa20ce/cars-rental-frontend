// import React from 'react';
// import Link from 'next/link';
// import { Button, ConfigProvider } from 'antd';
// import type { Car as LibCar, CarACF } from '@/lib/types/Car';

// interface CarCardProps {
// 	car: LibCar;
// }

// export const CarCard: React.FC<CarCardProps> = ({ car }) => {
// 	const acf: CarACF = car.acf ?? { nazvanie_avto: '', '30_dnej': '' };

// 	const imageUrl =
// 		(Array.isArray(acf.white_gallery) && acf.white_gallery[0]) ||
// 		(Array.isArray(acf.black_gallery) && acf.black_gallery[0]) ||
// 		(Array.isArray(acf.gray_gallery) && acf.gray_gallery[0]) ||
// 		(Array.isArray(acf.blue_gallery) && acf.blue_gallery[0]) ||
// 		(Array.isArray(acf.red_gallery) && acf.red_gallery[0]) ||
// 		'';

// 	const carLink = `/cars/${car.slug}`;

// 	const safeParseDate = (dateStr:string):Date => {
// 		const [day,month,year] = dateStr.split('/').map(Number);
// 		return new Date(year,month-1,day);
// 	};

// 	const isActiveSale = (acf:CarACF):boolean =>{
// 		const start = acf.skidka_start;
// 		const end = acf.skidka_end;
// 		if (!start || !end) return false;
// 		const startDate = safeParseDate(start);
// 		const endDate = safeParseDate(end);
// 		const today = new Date();
// 		return startDate <= today && today <= endDate;
// 	}

// 	const hasSale =isActiveSale(acf);
// 	const originalPrice = parseInt(acf['30_dnej'] || '0', 10);
//   	const salePrice = parseInt(acf['30_dnej_S'] || acf['30_dnej'] || '0', 10);

// 	const discountPercent = acf.skidka || '10';

// 	const formatShortDate = (dateStr: string) =>{
// 		const [day,month] = dateStr.split('/');
// 		return `${day} ${getShortMonthName(month)}`;
// 	}

// 	const getShortMonthName = (month:string) => {
// 		const map ={
// 			'01': 'янв.',
// 			'02': 'фев.',
// 			'03': 'мар.',
// 			'04': 'апр.',
// 			'05': 'мая',
// 			'06': 'июн.',
// 			'07': 'июл.',
// 			'08': 'авг.',
// 			'09': 'сен.',
// 			'10': 'окт.',
// 			'11': 'ноя.',
// 			'12': 'дек.',
// 		};
// 		return map[month as keyof typeof map] || '';
// 	}

// 	return (
// 		<div className="car-card flex flex-col bg-[#f6f6f60e] rounded-2xl ">
// 			<Link href={carLink} passHref className="contents">
// 				<img
// 					src={imageUrl}
// 					alt={acf.nazvanie_avto}
// 					className="w-full min-w-[310px] h-3/4 max-h-[207px] object-cover mb-[14px] rounded-2xl lg:max-h-[252px] lg:mb-4"
// 				/>
// 			</Link>

// 			<div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
// 				<div className="w-full">
// 					<Link href={carLink} passHref>
// 						<div className="text-lg font-semibold text-[#f6f6f6]">{acf.nazvanie_avto}</div>
// 					</Link>
// 					<div className="text-xl font-semibold text-[#f6f6f6] ">
// 						{acf['30_dnej']} ₽/сут.
// 					</div>
// 				</div>

// 				<div className="flex flex-col justify-center w-[103px] lg:justify-end">
// 					<ConfigProvider
// 						theme={{
// 							components: {
// 								Button: {
// 									defaultBg: '#3c6e71',
// 									defaultBorderColor: '#3c6e71',
// 									defaultColor: '#f6f6f6',
// 									contentFontSize: 16,
// 									controlHeight: 42,
// 									textHoverBg: '#f6f6f6',
// 									colorPrimaryHover: '#f6f6f6',
// 									colorBorderSecondary: '#3c6e71',
// 									colorBorderBg: '#3c6e71',
// 									colorBgContainer: '#3c6e71',
// 									colorPrimaryBorderHover: '#3c6e71',
// 									defaultHoverBorderColor: '#3c6e71',
// 									defaultActiveBorderColor: '#3c6e71',
// 									defaultActiveColor: '#f6f6f6',
// 									colorBorder: '#3c6e71',
// 									colorBgTextActive: '#3c6e71',
// 									borderRadius: 12,
// 								},
// 							},
// 						}}
// 					>
// 						<Button block style={{ height: '40px', }}>
// 							<span className='mt-[-1px]'>Оформить</span>
// 						</Button>
// 					</ConfigProvider>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
import React from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import type { Car as LibCar, CarACF } from '@/lib/types/Car';

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

  
  const safeParseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const isActiveSale = (acf: CarACF): boolean => {
    const start = acf.skidka_start;
    const end = acf.skidka_end;
    if (!start || !end) return false;
    const startDate = safeParseDate(start);
    const endDate = safeParseDate(end);
    const today = new Date();
    return startDate <= today && today <= endDate;

  };

  const hasSale = isActiveSale(acf);
  const originalPrice = parseInt(acf['30_dnej'] || '0', 10);
  const discountPercent = parseInt(acf['skidka'] || '0' ,10)
  const salePrice= originalPrice - (originalPrice * (discountPercent/100))

  return (
    <div className="car-card flex flex-col bg-[#f6f6f60e] rounded-2xl ">
      <div className="relative">
        <Link href={carLink} passHref className="contents">
          <img
            src={imageUrl}
            alt={acf.nazvanie_avto}
            className="w-full min-w-[310px] h-3/4 max-h-[207px] object-cover mb-[14px] rounded-2xl lg:max-h-[252px] lg:mb-4"
          />
        </Link>

        
        {hasSale && (
          <div className="absolute top-1  flex items-center gap-2 px-[19px] h-[28px] rounded-full  text-white text-xs">
            <span className="bg-[#3C713C] text-white px-2 py-[2px] rounded-full">
              Новинка
            </span>
            {discountPercent && (
              <span className="bg-[#B03D3D] px-2 py-[2px] rounded-full">
                -{discountPercent}%
              </span>
            )}
			
			<div className='rounded-full bg-[#0000008A] w-[185px]'>
				{acf.skidka_start && acf.skidka_end && (() => {
				const [startDay, startMonth, startYear] = acf.skidka_start.split('/');
				const [endDay, endMonth, endYear] = acf.skidka_end.split('/');
				const months: Record<string, string> = {
					'01': 'янв.',
					'02': 'фев.',
					'03': 'мар.',
					'04': 'апр.',
					'05': 'мая',
					'06': 'июн.',
					'07': 'июл.',
					'08': 'авг.',
					'09': 'сен.',
					'10': 'окт.',
					'11': 'ноя.',
					'12': 'дек.',
				};
				return (
					<span>
					с {startDay} по {endDay} {months[endMonth] || ''} {endYear.slice(-2)}
					</span>
				);
				})()}
			</div>
          </div>
        )}
      </div>

      <div className="flex justify-between pb-4 px-4 lg:pb-[26px] lg:px-[26px]">
        <div className="w-full">
          <Link href={carLink} passHref>
            <div className="text-lg font-semibold text-[#f6f6f6]">
              {acf.nazvanie_avto}
            </div>
          </Link>

          
          <div className="text-xl font-semibold text-[#f6f6f6] ">
            {hasSale ? (
              <>
                <span>{salePrice.toLocaleString()} ₽/сут.</span>{' '}
                <span className="line-through text-[#f6f6f633] text-base font-normal ml-1">
                  {originalPrice.toLocaleString()} ₽/сут.
                </span>
              </>
            ) : (
              <>{originalPrice.toLocaleString()} ₽/сут.</>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center w-[103px] lg:justify-end">
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
              <span className="mt-[-1px]">Оформить</span>
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};
