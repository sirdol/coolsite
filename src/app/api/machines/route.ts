// src/app/api/machines/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Replace this with your external JSON API endpoint
    const res = await fetch('http://172.20.95.125:3001/getdata');
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('API fetch error:', err.message);
    return NextResponse.json([]);
  }
}
