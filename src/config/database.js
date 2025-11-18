import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// In development, route Neon HTTP traffic via Neon Local
if (process.env.NODE_ENV === 'development') {
  neonConfig.fetchEndpoint = 'http://neon-local:5432/sql'
  neonConfig.useSecureWebSocket = false; // Neon Local uses HTTP only, no secure websockets
  neonConfig.poolQueryViaFetch = true;
}

export const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
