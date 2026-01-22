// ============================================================
// Database Schema
// ============================================================

import { getDatabase, isDatabaseInitialized } from './connection';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_SEGMENTS, DEFAULT_ORGANIZATIONS } from '@shared/constants';

/**
 * Create all database tables
 */
export function createTables(): void {
  const db = getDatabase();

  // Nodes: Every item in the hierarchy
  db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      node_type TEXT NOT NULL,

      -- Hierarchy codes (dual hierarchy system)
      function_code TEXT,
      organization_code TEXT,

      -- Parent references (dual hierarchy)
      function_parent_id TEXT REFERENCES nodes(id),
      organization_parent_id TEXT REFERENCES nodes(id),

      -- Position in sibling list
      function_position INTEGER DEFAULT 0,
      organization_position INTEGER DEFAULT 0,

      -- For items: source content
      source_url TEXT,
      favicon_path TEXT,
      thumbnail_path TEXT,

      -- AI-generated content
      ai_summary TEXT,
      ai_key_points TEXT,
      ai_confidence REAL,

      -- Metadata
      content_type_code TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      is_deleted INTEGER DEFAULT 0
    )
  `);

  // Metadata tags (cross-cutting)
  db.exec(`
    CREATE TABLE IF NOT EXISTS metadata_tags (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
      tag_type TEXT NOT NULL,
      tag_code TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Extracted fields (per content type)
  db.exec(`
    CREATE TABLE IF NOT EXISTS extracted_fields (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
      field_name TEXT NOT NULL,
      field_value TEXT,
      field_type TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Segments (top-level containers)
  db.exec(`
    CREATE TABLE IF NOT EXISTS segments (
      id TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
      segment_code TEXT NOT NULL UNIQUE,
      segment_name TEXT NOT NULL,
      color TEXT,
      icon TEXT
    )
  `);

  // Organizations (for Organization view)
  db.exec(`
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
      org_code TEXT NOT NULL UNIQUE,
      org_name TEXT NOT NULL,
      logo_path TEXT
    )
  `);

  // User custom spaces
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_spaces (
      id TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
      space_name TEXT NOT NULL,
      description TEXT,
      color TEXT
    )
  `);

  // Processing queue (for background enrichment)
  db.exec(`
    CREATE TABLE IF NOT EXISTS processing_queue (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
      phase TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      error_message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      processed_at TEXT
    )
  `);

  // Settings
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  // FTS5 Full-Text Search virtual table for fast text search
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS nodes_fts USING fts5(
      title,
      ai_summary,
      source_url,
      content='nodes',
      content_rowid='rowid'
    )
  `);

  // Triggers to keep FTS index in sync with nodes table
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_insert AFTER INSERT ON nodes BEGIN
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url)
      VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url);
    END
  `);

  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_delete AFTER DELETE ON nodes BEGIN
      INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url)
      VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url);
    END
  `);

  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_update AFTER UPDATE ON nodes BEGIN
      INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url)
      VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url);
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url)
      VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url);
    END
  `);

  console.log('Database tables created successfully');
}

/**
 * Create indexes for performance
 */
export function createIndexes(): void {
  const db = getDatabase();

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_nodes_function_parent ON nodes(function_parent_id);
    CREATE INDEX IF NOT EXISTS idx_nodes_organization_parent ON nodes(organization_parent_id);
    CREATE INDEX IF NOT EXISTS idx_nodes_function_code ON nodes(function_code);
    CREATE INDEX IF NOT EXISTS idx_nodes_organization_code ON nodes(organization_code);
    CREATE INDEX IF NOT EXISTS idx_nodes_node_type ON nodes(node_type);
    CREATE INDEX IF NOT EXISTS idx_nodes_is_deleted ON nodes(is_deleted);
    CREATE INDEX IF NOT EXISTS idx_metadata_tags_node ON metadata_tags(node_id);
    CREATE INDEX IF NOT EXISTS idx_metadata_tags_type_code ON metadata_tags(tag_type, tag_code);
    CREATE INDEX IF NOT EXISTS idx_extracted_fields_node ON extracted_fields(node_id);
    CREATE INDEX IF NOT EXISTS idx_processing_queue_status ON processing_queue(status);
  `);

  console.log('Database indexes created successfully');
}

/**
 * Insert default segments
 */
export function insertDefaultSegments(): void {
  const db = getDatabase();

  const insertNode = db.prepare(`
    INSERT OR IGNORE INTO nodes (id, title, node_type, function_code, function_position, created_at, updated_at)
    VALUES (?, ?, 'segment', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  const insertSegment = db.prepare(`
    INSERT OR IGNORE INTO segments (id, segment_code, segment_name, color)
    VALUES (?, ?, ?, ?)
  `);

  for (let i = 0; i < DEFAULT_SEGMENTS.length; i++) {
    const segment = DEFAULT_SEGMENTS[i];
    const id = uuidv4();

    insertNode.run(id, segment.name, segment.code, i);
    insertSegment.run(id, segment.code, segment.name, segment.color);
  }

  console.log('Default segments inserted');
}

/**
 * Insert default organizations
 */
export function insertDefaultOrganizations(): void {
  const db = getDatabase();

  const insertNode = db.prepare(`
    INSERT OR IGNORE INTO nodes (id, title, node_type, organization_code, organization_position, created_at, updated_at)
    VALUES (?, ?, 'organization', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  const insertOrg = db.prepare(`
    INSERT OR IGNORE INTO organizations (id, org_code, org_name)
    VALUES (?, ?, ?)
  `);

  for (let i = 0; i < DEFAULT_ORGANIZATIONS.length; i++) {
    const org = DEFAULT_ORGANIZATIONS[i];
    const id = uuidv4();

    insertNode.run(id, org.name, org.code, i);
    insertOrg.run(id, org.code, org.name);
  }

  console.log('Default organizations inserted');
}

/**
 * Initialize the database schema and default data
 */
export function initializeDatabase(): void {
  if (isDatabaseInitialized()) {
    console.log('Database already initialized');
    return;
  }

  console.log('Initializing database...');

  createTables();
  createIndexes();
  insertDefaultSegments();
  insertDefaultOrganizations();

  console.log('Database initialization complete');
}

/**
 * Run database migrations (for future schema updates)
 */
export function runMigrations(): void {
  const db = getDatabase();

  // Get current schema version
  const versionResult = db.prepare(`
    SELECT value FROM settings WHERE key = 'schema_version'
  `).get() as { value: string } | undefined;

  const currentVersion = versionResult ? parseInt(versionResult.value, 10) : 0;
  let targetVersion = currentVersion;

  // Migration 1: Initial schema (already handled by createTables)
  if (currentVersion < 1) {
    console.log('Running migration 1...');
    // Initial schema is handled by createTables
    targetVersion = 1;
  }

  // Migration 2: Add FTS5 full-text search and populate index
  if (currentVersion < 2) {
    console.log('Running migration 2: Adding FTS5 full-text search...');
    
    // Create FTS5 table if it doesn't exist (for existing databases)
    db.exec(`
      CREATE VIRTUAL TABLE IF NOT EXISTS nodes_fts USING fts5(
        title,
        ai_summary,
        source_url,
        content='nodes',
        content_rowid='rowid'
      )
    `);

    // Create triggers if they don't exist
    db.exec(`
      CREATE TRIGGER IF NOT EXISTS nodes_fts_insert AFTER INSERT ON nodes BEGIN
        INSERT INTO nodes_fts(rowid, title, ai_summary, source_url)
        VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url);
      END
    `);

    db.exec(`
      CREATE TRIGGER IF NOT EXISTS nodes_fts_delete AFTER DELETE ON nodes BEGIN
        INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url)
        VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url);
      END
    `);

    db.exec(`
      CREATE TRIGGER IF NOT EXISTS nodes_fts_update AFTER UPDATE ON nodes BEGIN
        INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url)
        VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url);
        INSERT INTO nodes_fts(rowid, title, ai_summary, source_url)
        VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url);
      END
    `);

    // Populate FTS index with existing data
    db.exec(`
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url)
      SELECT rowid, title, ai_summary, source_url FROM nodes
      WHERE rowid NOT IN (SELECT rowid FROM nodes_fts)
    `);

    console.log('FTS5 full-text search migration complete');
    targetVersion = 2;
  }

  // Update schema version
  if (targetVersion > currentVersion) {
    db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES ('schema_version', ?)
    `).run(targetVersion.toString());

    console.log(`Schema migrated from version ${currentVersion} to ${targetVersion}`);
  }
}
