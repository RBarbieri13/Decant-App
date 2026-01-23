// ============================================================
// Database Connection
// ============================================================
import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';
import fs from 'fs';
let db = null;
export function getDatabasePath() {
    const dataDir = path.join(os.homedir(), '.decant', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, 'decant.db');
}
export function getDatabase() {
    if (db) {
        return db;
    }
    const dbPath = getDatabasePath();
    console.log(`Opening database at: ${dbPath}`);
    db = new Database(dbPath);
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    // Enable WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    return db;
}
export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
        console.log('Database connection closed');
    }
}
export function isDatabaseInitialized() {
    const database = getDatabase();
    const result = database.prepare(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name='nodes'
  `).get();
    return !!result;
}
