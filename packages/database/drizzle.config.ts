import { defineConfig } from 'drizzle-kit';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;
const useSqlite =
  process.env.USE_SQLITE === 'true' ||
  (!!DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite')));

const out = './packages/database/migrations';
const schema = './packages/database/schema/*.schema.ts';

let config: any;
if (useSqlite) {
  // Use relative path (from repo root) for drizzle-kit compatibility
  const defaultSqlitePath = './packages/database/dev.sqlite';
  const sqliteUrl = DATABASE_URL ? DATABASE_URL : `file:${defaultSqlitePath}`;
  config = {
    out,
    schema,
    dialect: 'sqlite',
    dbCredentials: {
      url: sqliteUrl,
    },
  };
} else {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL must be set. Ensure the database is provisioned');
  }
  config = {
    out,
    schema,
    dialect: 'postgresql',
    dbCredentials: {
      url: DATABASE_URL,
    },
  };
}

export default defineConfig(config);
