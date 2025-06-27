'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Blog } from '../types/blog';

const sql = postgres(process.env.POSTGRES_URL!);

const BlogSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string(),
});

const CreateBlog = BlogSchema.omit({ id: true, createdAt: true });

export async function createBlog(FormData: FormData) {
  const { title, body } = CreateBlog.parse({
    title: FormData.get('title'),
    body: FormData.get('body'),
  });
  const createdAt = new Date().toISOString().split('T')[0];

  try {
    await sql`
        INSERT INTO blogs (title, body, created_at)
        VALUES (${title}, ${body}, ${createdAt})
    `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/');
  redirect('/');
}

export async function fetchAllBlogs() {
  try {
    return await sql<Blog[]>`
            SELECT * FROM blogs
        `;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch all blogs');
  }
}
