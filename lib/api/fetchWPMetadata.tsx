const WP_API_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

export async function fetchWPMetadata(pagePath: string) {
	try {
		const pageUrl = `${WP_API_URL}${pagePath}`;
		const res = await fetch(
			`${WP_API_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`,
			{ cache: 'no-store' }
		);
		if (!res.ok) return {};

		const { head } = await res.json();

		if (head) {
			const titleMatch = head.match(/<title>(.*?)<\/title>/i);
			const title = titleMatch ? titleMatch[1] : undefined;
			const descMatch = head.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
			const description = descMatch ? descMatch[1] : undefined;

			return {
				title,
				description,
			};
		}
	} catch (err) {
		console.error('[fetchWPMetadata]', err);
	}
	return {};
}
