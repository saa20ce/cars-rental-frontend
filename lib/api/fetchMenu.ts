import { WPMenuType } from '@/lib/types/Menu';
import { wpFetch } from './wpCache';

export async function fetchMenuItems(
    url: string,
): Promise<WPMenuType[] | null> {
    try {
        const res = await wpFetch(url, { next: { tags: ['wordpress-menu'] } });
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
