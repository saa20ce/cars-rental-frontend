// app/cars/[slug]/page.tsx
import { notFound } from 'next/navigation'

type Car = {
  id: number
  slug: string
  title: {
    rendered: string
  }
  acf?: {
    nazvanie_avto?: string
    white_gallery?: string[]
    black_gallery?: string[]
    [key: string]: any
  }
}

async function getCarBySlug(slug: string): Promise<Car | null> {
  const res = await fetch(
    `https://demo.rentasib.ru/wp-json/wp/v2/cars?slug=${slug}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    return null
  }

  const data: Car[] = await res.json()
  return data && data.length > 0 ? data[0] : null
}

interface SingleCarPageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

// Асинхронный компонент с ожидаемым params
export default async function SingleCarPage(props: SingleCarPageProps) {
  const { slug } = await props.params
  const car = await getCarBySlug(slug)
  console.log('car', car)

  if (!car) {
    return notFound()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {car.title.rendered || 'Без заголовка'}
      </h1>

      {car.acf?.nazvanie_avto && (
        <h2 className="text-xl font-semibold mb-2">
          {car.acf.nazvanie_avto}
        </h2>
      )}

      <div className="flex gap-4 overflow-x-auto">
        {(car.acf?.white_gallery || car.acf?.black_gallery)?.map((imgUrl) => (
          <img
            key={imgUrl}
            src={imgUrl}
            alt={imgUrl}
            className="h-48 w-auto object-cover"
          />
        ))}
      </div>

      <div className="mt-4 space-y-1">
        <p>Год выпуска: {car.acf?.year ?? '—'}</p>
        <p>Объём двигателя: {car.acf?.engine_volume ?? '—'}</p>
        <p>Расход топлива: {car.acf?.fuel_flow ?? '—'}</p>
        <p>Пассажиров: {car.acf?.passengers ?? '—'}</p>
        <p>Цена от: {car.acf?.czena_ot ?? '—'}</p>
      </div>
    </div>
  )
}
