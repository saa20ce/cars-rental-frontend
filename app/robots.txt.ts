const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rentasib.ru';

export default function robots() {
    return `
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-login.php


Sitemap: ${SITE_URL}/sitemap-index.xml
`;
}
