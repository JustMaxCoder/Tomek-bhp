import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('❌ DATABASE_URL не задан. Установите переменную окружения с вашим Supabase connection string.');
}

if (!DATABASE_URL.includes('postgresql://') && !DATABASE_URL.includes('postgres://')) {
  throw new Error('❌ DATABASE_URL должен быть валидным PostgreSQL connection string');
}

console.log('[DB] ✅ Using Supabase/PostgreSQL database');

// Create connection pool with Supabase-optimized settings
export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout after 10 seconds if connection can't be established
  ssl: DATABASE_URL.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
});

// Test connection on startup
pool.on('error', (err) => {
  console.error('[DB] ❌ Unexpected error on idle client', err);
});

// Create Drizzle instance
export const db = drizzle(pool);

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('[DB] ✅ Connection successful. Server time:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('[DB] ❌ Connection failed:', err);
    process.exit(1);
  }
})();