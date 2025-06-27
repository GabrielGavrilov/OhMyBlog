import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!);

async function seedBlogs() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at DATE NOT NULL
    )
  `;
}

export async function GET() {
  try {
    await seedBlogs();
    return NextResponse.json({ message: 'successfully seeded the database' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
