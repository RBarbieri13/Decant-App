// ============================================================
// Database Connection
// ============================================================

import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { APP_NAME, DATABASE_FILENAME } from '@shared/constants';

let db: Database.Database | null = null;

/**
 * Get the path to the app data directory
 */
export function getAppDataPath(): string {
  const userDataPath = app.getPath('userData');
  return userDataPath;
}

/**
 * Get the path to the database file
 */
export function getDatabasePath(): string {
  return path.join(getAppDataPath(), DATABASE_FILENAME);
}

/**
 * Initialize and return the database connection
 */
export function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  const dbPath = getDatabasePath();
  const dbDir = path.dirname(dbPath);

  // Ensure the directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log(`Opening database at: ${dbPath}`);

  // Create or open the database
  db = new Database(dbPath);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Enable WAL mode for better concurrency
  db.pragma('journal_mode = WAL');

  return db;
}

/**
 * Close the database connection
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
    console.log('Database connection closed');
  }
}

/**
 * Check if the database has been initialized (tables exist)
 */
export function isDatabaseInitialized(): boolean {
  const database = getDatabase();
  const result = database.prepare(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name='nodes'
  `).get();
  return !!result;
}
