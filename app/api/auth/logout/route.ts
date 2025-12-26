import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function POST() {
    cookies().delete('admin_session');
    return NextResponse.json({ success: true });
}
