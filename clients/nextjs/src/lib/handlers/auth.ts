import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function createUser(req: NextRequest) {
  const { title } = await req.json();
  console.log(title);
  return NextResponse.json({ msg: 'ok' });
}
