// src/config/database.js
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';

const { Pool } = pkg;

let db;

if (process.env.NODE_ENV === 'test') {
  console.warn('Skipping DB setup during tests');
  db = { mock: true };
} else {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  db = drizzle(pool);
}

export { db };
