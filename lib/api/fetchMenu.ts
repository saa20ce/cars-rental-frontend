import { WPMenuType } from '@/lib/types/Menu';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;


export async function fetchMenuItems(
	url: string,
): Promise<WPMenuType[] | null> {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			console.error('Ошибка при запросе меню:', url, res.status);
			return null;
		}
		const data: WPMenuType[] = await res.json();
		if (Array.isArray(data) && data.length > 0) {
			return data;
		}
		return null;
	} catch (err) {
		console.error('Ошибка fetchMenuItems:', err);
		return null;
	}
}
