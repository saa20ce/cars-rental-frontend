export function GET(request: Request) {
    const url = new URL('/sitemap-index.xml', request.url);
    return Response.redirect(url, 308);
}
