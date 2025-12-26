import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/tools/add') ||
        request.nextUrl.pathname.startsWith('/categories/add');

    if (isAdminRoute) {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/tools/add/:path*',
        '/categories/add/:path*',
    ],
};
