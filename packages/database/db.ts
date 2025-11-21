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

// Prefer explicit SQLite when DATABASE_URL starts with file: or ends with .sqlite
const useSqlite =
  process.env.USE_SQLITE === 'true' ||
  (!!DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite')));

let db: any;

if (useSqlite) {
  const sqlitePath = (DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite')))
    ? DATABASE_URL.replace(/^file:/, '')
    : path.resolve(process.cwd(), 'packages/database/dev.sqlite');
  console.log('[DB] Using SQLite database at:', sqlitePath);
  const sqlite = new Database(sqlitePath);
  db = drizzleSqlite(sqlite);
} else {
  if (!DATABASE_URL) {
    throw new Error(
      'DATABASE_URL must be set for Postgres/Neon mode. To use local SQLite set USE_SQLITE=true or DATABASE_URL=file:./packages/database/dev.sqlite'
    );
  }

  const sql = neon(DATABASE_URL);
  db = drizzleNeon(sql);
}

export { db };
