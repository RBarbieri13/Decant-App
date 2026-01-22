// ============================================================
// iMessage Database Connection
// ============================================================

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import os from 'os';

const IMESSAGE_DB_PATH = path.join(
  os.homedir(),
  'Library/Messages/chat.db'
);

const IMESSAGE_CHAT_ID = 117; // Self-conversation

/**
 * Copy iMessage database to temp location (permission workaround)
 * Required for Full Disk Access on macOS
 */
function copyIMessageDatabase(): string {
  const tempPath = path.join(os.tmpdir(), 'chat_copy.db');

  try {
    // Use osascript to bypass Full Disk Access requirement
    execSync(
      `osascript -e 'do shell script "cp ${IMESSAGE_DB_PATH} ${tempPath}"'`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return tempPath;
  } catch (error) {
    console.error('Failed to copy iMessage database:', error);
    throw new Error(
      'Cannot access iMessage database. Please ensure Full Disk Access is enabled for your terminal/application.'
    );
  }
}

/**
 * Get connection to iMessage database
 */
export function getIMessageDatabase(): Database.Database {
  try {
    // Check if original file exists
    if (!fs.existsSync(IMESSAGE_DB_PATH)) {
      throw new Error(`iMessage database not found at ${IMESSAGE_DB_PATH}`);
    }

    // Copy to temp location
    const tempPath = copyIMessageDatabase();

    // Open temp copy
    const db = new Database(tempPath, { readonly: true });
    return db;
  } catch (error) {
    console.error('Failed to open iMessage database:', error);
    throw error;
  }
}

/**
 * Convert Apple timestamp (nanoseconds since Jan 1, 2001) to ISO datetime
 */
export function appleTimestampToISO(timestamp: number): string {
  const APPLE_EPOCH = 978307200; // Unix timestamp of Jan 1, 2001
  const seconds = timestamp / 1_000_000_000;
  const unixTimestamp = seconds + APPLE_EPOCH;
  return new Date(unixTimestamp * 1000).toISOString();
}

/**
 * Query iMessage database for new messages in self-conversation
 */
export function getNewIMessageMessages(
  sinceRowId: number = 0
): Array<{
  rowid: number;
  text: string | null;
  attributedBody: Buffer | null;
  date: number;
  message_date: string;
}> {
  let db: Database.Database | null = null;

  try {
    db = getIMessageDatabase();

    const query = `
      SELECT
        m.ROWID as rowid,
        m.text,
        m.attributedBody,
        m.date,
        datetime((m.date / 1000000000.0) + 978307200.0, 'unixepoch') as message_date
      FROM message m
      JOIN chat_message_join cmj ON m.ROWID = cmj.message_id
      WHERE cmj.chat_id = ?
        AND m.ROWID > ?
      ORDER BY m.ROWID
    `;

    const stmt = db.prepare(query);
    const results = stmt.all(IMESSAGE_CHAT_ID, sinceRowId) as Array<{
      rowid: number;
      text: string | null;
      attributedBody: Buffer | null;
      date: number;
      message_date: string;
    }>;

    return results;
  } catch (error) {
    console.error('Failed to query iMessage database:', error);
    throw error;
  } finally {
    if (db) {
      db.close();
    }
  }
}

/**
 * Close iMessage database connection
 */
export function closeIMessageDatabase(db: Database.Database): void {
  try {
    db.close();
  } catch (error) {
    console.error('Error closing iMessage database:', error);
  }
}
