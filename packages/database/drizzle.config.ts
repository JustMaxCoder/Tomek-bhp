import { defineConfig } from 'drizzle-kit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
const useSqlite =
  process.env.USE_SQLITE === 'true' ||
  (!!DATABASE_URL && (DATABASE_URL.startsWith('file:') || DATABASE_URL.endsWith('.sqlite')));

const out = './packages/database/migrations';
const schema = './packages/database/schema/*.schema.ts';

let config: any;
if (useSqlite) {
  // Use absolute path for better-sqlite3 compatibility
  const defaultSqlitePath = path.resolve(__dirname, 'dev.sqlite');
  const sqliteUrl = DATABASE_URL ? DATABASE_URL : defaultSqlitePath;
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
