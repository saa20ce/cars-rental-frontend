import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const path = searchParams.get('path') || '/'
	const items = await fetchBreadcrumbs(path)
	return Response.json(items)
}
