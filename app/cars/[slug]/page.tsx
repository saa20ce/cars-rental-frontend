import { notFound } from 'next/navigation';
import {
	getCarBySlug,
	getSeasonDates,
	buildPriceRangesFromACF,
} from '@/lib/api/fetchCarData';
import SingleCarPageClient from '@/client/cars/[slug]/SingleCarPageClient';

export const dynamic = 'force-dynamic';

interface SingleCarPageProps {
	params: Promise<{ slug: string }>;
}


export default async function SingleCarPage({ params }: SingleCarPageProps) {
	const { slug } = await params;
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
