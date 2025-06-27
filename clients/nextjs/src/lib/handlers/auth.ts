import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function createUser(req: NextRequest) {
  const { title } = await req.json();
  console.log(title);
  return NextResponse.json({ msg: 'ok' });
}
