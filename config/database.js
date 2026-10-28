const path = require('path');
let db;
let pool;
async function initDatabase() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require('pg');
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined });
    await pool.query('CREATE TABLE IF NOT EXISTS replies (id BIGSERIAL PRIMARY KEY, message TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW())');
    console.log('PostgreSQL ready');
  } else {
    const Database = require('better-sqlite3');
    db = new Database(path.join(__dirname, '..', '..', 'replies.sqlite'));
    db.exec('CREATE TABLE IF NOT EXISTS replies (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)');
    console.log('SQLite ready (local or ephemeral storage)');
  }
}
async function saveReply(message) {
  if (pool) await pool.query('INSERT INTO replies (message) VALUES ($1)', [message]);
  else db.prepare('INSERT INTO replies (message) VALUES (?)').run(message);
}
module.exports = { initDatabase, saveReply };
