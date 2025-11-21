import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;

// SQLite support
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;

let db: any;
let pool: any;

if (DATABASE_URL && (DATABASE_URL.includes('postgresql://') || DATABASE_URL.includes('postgres://'))) {
  // Use PostgreSQL/Supabase (prioritize this if DATABASE_URL looks like postgres)
  console.log('[DB] ✅ Using Supabase/PostgreSQL database');

  // Create connection pool with Supabase-optimized settings
  pool = new Pool({
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
  db = drizzle(pool);
} else if (DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite'))) {
  // Use SQLite if DATABASE_URL is a file path
  const sqlitePath = DATABASE_URL.replace(/^file:/, '');
  console.log('[DB] Using SQLite database at:', sqlitePath);
  const sqlite = new Database(sqlitePath);
  db = drizzleSqlite(sqlite);
} else if (process.env.USE_SQLITE === 'true') {
  // Use SQLite fallback if explicitly requested
  const sqlitePath = path.resolve(process.cwd(), 'packages/database/dev.sqlite');
  console.log('[DB] Using SQLite database at:', sqlitePath);
  const sqlite = new Database(sqlitePath);
  db = drizzleSqlite(sqlite);
} else {
  // Default to SQLite if nothing else specified
  const sqlitePath = path.resolve(process.cwd(), 'packages/database/dev.sqlite');
  console.log('[DB] Using SQLite database at:', sqlitePath);
  const sqlite = new Database(sqlitePath);
  db = drizzleSqlite(sqlite);
}

export { db, pool };