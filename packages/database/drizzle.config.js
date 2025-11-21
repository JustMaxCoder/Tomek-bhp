
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;

// Check if it's a PostgreSQL URL (Supabase/Neon/etc)
const isPostgresUrl = DATABASE_URL && (
  DATABASE_URL.includes('postgresql://') || 
  DATABASE_URL.includes('postgres://') ||
  DATABASE_URL.includes('supabase.co') ||
  DATABASE_URL.includes('neon.tech')
);

const out = './packages/database/migrations';
const schema = './packages/database/schema/*.schema.ts';

let config;

if (isPostgresUrl) {
  // Use PostgreSQL
  config = {
    out,
    schema,
    dialect: 'postgresql',
    dbCredentials: {
      url: DATABASE_URL,
    },
  };
} else {
  // Use SQLite as fallback
  const defaultSqlitePath = path.resolve(__dirname, 'dev.sqlite');
  const sqliteUrl = DATABASE_URL || defaultSqlitePath;
  config = {
    out,
    schema,
    dialect: 'sqlite',
    dbCredentials: {
      url: sqliteUrl,
    },
  };
}

module.exports = config;
