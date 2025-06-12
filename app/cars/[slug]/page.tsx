import { notFound } from 'next/navigation';
import {
	getCarBySlug,
	getSeasonDates,
	buildPriceRangesFromACF,
	getDeliveryPrice,
	getSimilarCars,
} from '@/lib/api/fetchCarData';
import { getCarTaxonomyNames } from '@/lib/api/fetchCarTaxonomies';
import { CAR_TAXONOMIES } from '@/lib/types/Taxonomies';
import SingleCarPageClient from '@/client/cars/[slug]/SingleCarPageClient';

export const dynamic = 'force-dynamic';

export default async function SingleCarPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const car = await getCarBySlug(slug);

	if (!car) return notFound();

	const seasonDates = await getSeasonDates();
	const priceRanges = buildPriceRangesFromACF(car.acf || {});
	const deliveryPrice = await getDeliveryPrice();
	const taxonomyValues = await getCarTaxonomyNames(car, CAR_TAXONOMIES);
	const similarCars = await getSimilarCars(car);

	return (
		<SingleCarPageClient
			car={car}
			seasonDates={seasonDates}
			priceRanges={priceRanges}
			deliveryPrice={deliveryPrice}
			taxonomyValues={taxonomyValues}
			similarCars={similarCars}
		/>
	);
}
