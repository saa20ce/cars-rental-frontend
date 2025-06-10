'use client';

import { LineIcon } from "@/lib/ui/icons";

export const RentSteps = () => {
	return (
		<div className="lg:relative lg:h-[404] lg:w-screen lg:-ml-[calc(50vw-645px)]">
			<div className="lg:bg-[#f6f6f60e] lg:absolute lg:top-0 lg:w-screen lg:flex lg:justify-center">
				<div className="bg-[#f6f6f60e] lg:bg-transparent lg:w-[1290px]">
					<div className="py-[41px] px-4 lg:py-[68px]">
						<div className="flex flex-row">
							<div className="text-xl font-bold lg:text-3xl">Порядок аренды:</div>
							<div className="hidden lg:block ml-4 mt-[6px]"><LineIcon /></div>
							<div className="hidden lg:block text-2xl underline underline-offset-4 ml-4 mt-[2px]">Полные условия</div>
						</div>
						<div className="flex flex-col mt-4 lg:flex-row lg:gap-6 lg:mt-6">
							<div className="card-step flex flex-row gap-4 lg:flex-col">
								<div className="flex flex-col lg:flex-row">
									<div className="text-xl px-4 py-2 bg-[#f6f6f638] rounded-xl">1</div>
									<div className="w-1/2 border-r-2 border-dashed border-[#f6f6f638] h-full lg:w-full lg:h-1/2 lg:border-r-0 lg:border-b-2"></div>
								</div>
								<div className="card-step__content">
									<div className="text-lg font-bold">Выбор автомобиля</div>
									<div className="text-sm pb-8 lg:pb-0">Выберите автомобиль на определенные даты через удобную форму бронирования и отправьте заявку. Также вы можете написать или позвонить нам, и мы поможем вам с выбором.</div>
								</div>
							</div>

							<div className="card-step flex flex-row gap-4 lg:flex-col">
								<div className="flex flex-col lg:flex-row">
									<div className="text-xl px-4 py-2 bg-[#f6f6f638] rounded-xl">2</div>
									<div className="w-1/2 border-r-2 border-dashed border-[#f6f6f638] h-full lg:w-full lg:h-1/2 lg:border-r-0 lg:border-b-2"></div>
								</div>
								<div className="card-step__content">
									<div className="text-lg font-bold">Условия аренды</div>
									<div className="text-sm pb-8 lg:pb-0">В течение 15 минут с вами свяжется наш менеджер для уточнения времени получения автомобиля, необходимости доставки, наличия детского кресла и предоставит подробную информацию о условиях аренды.</div>
								</div>
							</div>

							<div className="card-step flex flex-row gap-4 lg:flex-col">
								<div className="flex flex-col lg:flex-row">
									<div className="text-xl px-4 py-2 bg-[#f6f6f638] rounded-xl">3</div>
									<div className="w-1/2 border-r-2 border-dashed border-[#f6f6f638] h-full lg:w-full lg:h-1/2 lg:border-r-0 lg:border-b-2"></div>
								</div>
								<div className="card-step__content">
									<div className="text-lg font-bold">Отправка документов</div>
									<div className="text-sm pb-8 lg:pb-0">Чтобы подтвердить бронирование, отправьте фотографии паспорта и водительского удостоверения через WhatsApp. Проверка документов службой безопасности займет не более 15 минут.</div>
								</div>
							</div>

							<div className="card-step flex flex-row gap-4 lg:flex-col">
								<div className="flex flex-col lg:flex-row">
									<div className="text-xl px-4 py-2 bg-[#f6f6f638] rounded-xl">4</div>
									<div className="hidden w-1/2 border-r-2 border-dashed border-[#f6f6f638] h-full lg:block lg:w-full lg:h-1/2 lg:border-r-0 lg:border-b-2"></div>
								</div>
								<div className="card-step__content">
									<div className="text-lg font-bold">Подтверждение аренды</div>
									<div className="text-sm">Вы получите подтверждение вашей брони, в котором будут указаны даты аренды, модель автомобиля, время и место его получения, а также стоимость.</div>
								</div>
							</div>

							<div className="flex text-lg mx-auto mt-4 underline underline-offset-[5px] decoration-1 lg:hidden">Полные условия</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};