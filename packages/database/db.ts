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
// Priority: 1. PostgreSQL if DATABASE_URL is set and is a postgres connection string (IGNORE USE_SQLITE flag)
//           2. SQLite if DATABASE_URL is a file path
//           3. SQLite fallback if no DATABASE_URL
const isPostgresUrl = DATABASE_URL && (DATABASE_URL.includes('postgresql://') || DATABASE_URL.includes('postgres://'));
const isSqliteUrl = DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite'));

let db: any;

if (isPostgresUrl) {
  // Use PostgreSQL/Supabase (prioritize this if DATABASE_URL looks like postgres)
  console.log('[DB] ✅ Using Supabase/PostgreSQL database');
  const sql = neon(DATABASE_URL);
  db = drizzleNeon(sql);
} else if (isSqliteUrl) {
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

export { db };
