import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
    noStore();
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path') || '/';

    try {
      const items = await fetchBreadcrumbs(path);
      return Response.json(items);
    } catch (err) {
      console.error("[api/breadcrumbs] fallback:", err);
      // важно: не валим build/SSR, а даём пустые крошки
      return Response.json([], { status: 200 });
}}
