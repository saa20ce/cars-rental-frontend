'use client'
import { ThumbsUp, TimeIcon, CarDescIcon, HandShakeIcon, CascoIcon, BubbleIcon } from "@/lib/ui/icons";

export const WhyUs = () => {
	return (
		<div>
			<div className="text-xl lg:text-3xl font-bold mt-10 mb-5 lg:mb-6" >Почему нам доверяют:</div>
			<div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-6">
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<ThumbsUp />
					</div>
					<div className="flex-wrap content-center">
						Высококачественный клиентский сервис
					</div>
				</div>
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<TimeIcon />
					</div>
					<div className="flex-wrap content-center">
						Доставка автомобилей 24/7
					</div>
				</div>
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<CarDescIcon />
					</div>
					<div className="flex-wrap content-center">
						Широкий выбор моделей в автопарке
					</div>
				</div>
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<HandShakeIcon />
					</div>
					<div className="flex-wrap content-center">
						Система лояльности для постоянных клиентов
					</div>
				</div>
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<CascoIcon />
					</div>
					<div className="flex-wrap content-center">
						КАСКО включена в стоимость
					</div>
				</div>
				<div className="flex flex-row gap-[14px]  bg-[#f6f6f60e] rounded-2xl p-5 lg:h-full lg:pb-6 lg:pt-6 lg:pr-8 lg:pl-8">
					<div>
						<BubbleIcon />
					</div>
					<div className="flex-wrap content-center">
						Без скрытых платежей и комиссий
					</div>
				</div>
			</div>
		</div>
	);
};