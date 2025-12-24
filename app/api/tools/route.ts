import { NextResponse } from 'next/server';
import { getTools, addTool } from '@/lib/dataService';

export async function GET() {
    const tools = await getTools();
    return NextResponse.json(tools);
}

export async function POST(request: Request) {
    const data = await request.json();
    const tool = await addTool(data);
    return NextResponse.json(tool);
}
