import { Button, ConfigProvider } from "antd";
import { CheckRound, FiltersIcon } from "@/lib/ui/icons";
import { CustomSelect } from "@/lib/ui/common/Select/CustomSelect";
import "./styles.css";

export const dynamic = 'force-dynamic';

export default function CarsPage() {
	return (
		<div className="bg-[#f6f6f60e] rounded-3xl p-[18px]">
			<h1 className="text-2xl mb-3">Автопарк</h1>
			<div className="grid grid-cols-2 gap-x-[10px] gap-y-[6px] text-sm pb-[14px] border-b-[1px] border-[#f6f6f638]">
				<div className="flex">
					<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> <b>КАСКО</b>&nbsp;и&nbsp;<b>ОСАГО</b>
				</div>

				<div className="flex">
					<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Обслуженные авто
				</div>

				<div className="flex">
					<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Большой выбор
				</div>

				<div className="flex">
					<div className="mr-[7px] mt-[-1px]"><CheckRound /></div> Доступные цены
				</div>
			</div>

			<div className="flex flex-col mt-[14px] mb-3 gap-[10px]">
				<CustomSelect
					placeholder="Класс"
					style={{ width: '100%' }}
				/>

				<CustomSelect
					placeholder="Марка"
					style={{ width: '100%' }}
				/>

				<CustomSelect
					placeholder="Цена"
					style={{ width: '100%' }}
				/>
			</div>

			<ConfigProvider
				theme={{
					components: {
						Button: {
							contentFontSize: 16,
							paddingInline: 12,
						},
					},
				}}
			>
				<Button
					icon={<FiltersIcon />}
					ghost
					className="filterButton"
					style={{
						height: '40px',
						width: '124px',
					}}
				>Фильтры</Button>
			</ConfigProvider>
		</div>
	);
}