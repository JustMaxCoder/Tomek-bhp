import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// SQLite support
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const DATABASE_URL = process.env.DATABASE_URL;

// Prefer explicit SQLite when DATABASE_URL starts with file: or ends with .sqlite
const useSqlite =
  process.env.USE_SQLITE === 'true' ||
  (!!DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite')));

let db: any;

if (useSqlite) {
  const sqlitePath = DATABASE_URL
    ? DATABASE_URL.replace(/^file:/, '')
    : './packages/database/dev.sqlite';
  const dbFile =
    sqlitePath.startsWith('./') || sqlitePath.startsWith('/') ? sqlitePath : `./${sqlitePath}`;
  const sqlite = new Database(dbFile);
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
