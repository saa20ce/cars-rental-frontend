import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import { getCars } from '@/lib/api/fetchCarData';
import { getAllTaxonomyOptions } from '@/lib/api/fetchCarTaxonomies';
import { getDeliveryPrice } from '@/lib/api/fetchCarData';
import CarsPageClient from '@/client/cars/CarsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
	return await fetchWPMetadata('/cars');
}

export default async function CarsPage() {
	const cars = await getCars({ per_page: '100' });

	const {
		klassOptions,
		markaOptions,
		kuzovOptions,
		privodOptions,
		dvigatelOptions,
		colorOptions
	} = await getAllTaxonomyOptions();

	const deliveryPrice = await getDeliveryPrice();

	return (
		<CarsPageClient
			cars={cars}
			klassOptions={klassOptions}
			markaOptions={markaOptions}
			kuzovOptions={kuzovOptions}
			privodOptions={privodOptions}
			dvigatelOptions={dvigatelOptions}
			colorOptions={colorOptions}
			deliveryPrice={deliveryPrice}
		/>
	);
}
