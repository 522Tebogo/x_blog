import { NextResponse } from 'next/server';
import { getCategories, addCategory } from '@/lib/dataService';

export async function GET() {
    const categories = await getCategories();
    return NextResponse.json(categories);
}

export async function POST(request: Request) {
    const data = await request.json();
    const category = await addCategory(data);
    return NextResponse.json(category);
}
