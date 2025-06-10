import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const res = NextResponse.next()
	res.cookies.set('pathname', request.nextUrl.pathname)
	return res
}

export const config = {
	matcher: '/((?!api|_next|favicon.ico).*)'
}
