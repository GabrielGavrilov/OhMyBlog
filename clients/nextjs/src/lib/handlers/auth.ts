'server only';

import postgres from 'postgres';
import { NextRequest } from 'next/server';
import { User } from '../types/auth';

export async function createUser(req: NextRequest) {
  console.log(req);
  // try {
  //     const data = await sql<User>`
  //         INSERT INTO users (id, email, display_name, password)
  //         VALUES (${})
  //     `
  // }
}
