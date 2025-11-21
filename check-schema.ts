import Database from 'better-sqlite3';
const db = new Database('packages/database/dev.sqlite');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables);
for (const table of tables) {
  const info = db.prepare(`PRAGMA table_info(${table.name})`).all();
  console.log(`\nTable: ${table.name}`);
  console.log(info);
}
db.close();
