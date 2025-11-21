import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// SQLite support
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;

// Determine which database to use
// Priority: 1. PostgreSQL if DATABASE_URL is set and is a postgres connection string
//           2. SQLite if DATABASE_URL is a file path or USE_SQLITE=true
//           3. Default to SQLite fallback
const isPostgresUrl = DATABASE_URL && (DATABASE_URL.includes('postgresql://') || DATABASE_URL.includes('postgres://'));
const isSqliteUrl = DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite'));
const useSqlite = process.env.USE_SQLITE === 'true' || isSqliteUrl;

console.log('[DB] DATABASE_URL exists:', !!DATABASE_URL);
console.log('[DB] isPostgresUrl:', isPostgresUrl);
console.log('[DB] isSqliteUrl:', isSqliteUrl);
console.log('[DB] useSqlite:', useSqlite);

let db: any;

if (!useSqlite && (isPostgresUrl || DATABASE_URL)) {
  // Use PostgreSQL/Neon
  if (!DATABASE_URL) {
    throw new Error(
      'DATABASE_URL must be set for Postgres/Neon mode. To use local SQLite set USE_SQLITE=true'
    );
  }

  console.log('[DB] ✅ Using Supabase/PostgreSQL database');
  const sql = neon(DATABASE_URL);
  db = drizzleNeon(sql);
} else {
  // Use SQLite
  const sqlitePath = isSqliteUrl
    ? DATABASE_URL.replace(/^file:/, '')
    : path.resolve(process.cwd(), 'packages/database/dev.sqlite');
  console.log('[DB] Using SQLite database at:', sqlitePath);
  const sqlite = new Database(sqlitePath);
  db = drizzleSqlite(sqlite);
}

export { db };
