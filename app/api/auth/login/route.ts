import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const adminUser = process.env.ADMIN_USER;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUser || !adminPassword) {
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        if (username === adminUser && password === adminPassword) {
            // Set a simple cookie for session
            // In a real app, use a signed JWT or session ID
            cookies().set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
