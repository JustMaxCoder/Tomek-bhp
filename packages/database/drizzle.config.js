
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set your Supabase connection string.');
}

if (!DATABASE_URL.includes('postgresql://') && !DATABASE_URL.includes('postgres://')) {
  throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
}

module.exports = {
  out: './packages/database/migrations',
  schema: './packages/database/schema/*.schema.ts',
  dialect: 'postgresql',
  driver: 'pg',
  dbCredentials: {
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
  },
};
