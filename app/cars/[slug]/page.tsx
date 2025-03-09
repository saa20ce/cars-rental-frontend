import { notFound } from 'next/navigation';
import {
	getCarBySlug,
	getSeasonDates,
	buildPriceRangesFromACF,
} from '@/lib/api/CarSlugApi';
import SingleCarPageClient from '../../../client/cars/[slug]/SingleCarPageClient';

interface SingleCarPageProps {
	params: { slug: string };
}

export const dynamic = 'force-dynamic';

export default async function SingleCarPage(props: SingleCarPageProps) {
	const { slug } = await props.params;
	const car = await getCarBySlug(slug);
	console.log('car', car);

	if (!car) {
		return notFound();
	}

	const gallery =
		car.acf?.white_gallery && car.acf.white_gallery.length > 0
			? car.acf.white_gallery
			: car.acf?.black_gallery || [];

	const seasonDates = await getSeasonDates();

	const priceRanges = buildPriceRangesFromACF(car.acf || {});

	return (
		<SingleCarPageClient
			car={car}
			gallery={gallery}
			seasonDates={seasonDates}
			priceRanges={priceRanges}
		/>
	);
}
