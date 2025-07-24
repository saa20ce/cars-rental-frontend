import { NextRequest } from 'next/server';
import { getCars } from '@/lib/api/fetchCarData';

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const params: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
        params[key] = value;
    }
    const cars = await getCars(params);
    return Response.json(cars);
}
