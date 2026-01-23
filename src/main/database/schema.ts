// ============================================================
// Database Schema
// ============================================================

import { getDatabase, isDatabaseInitialized } from './connection';

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

      -- AI-generated content (Phase 1)
      ai_summary TEXT,
      ai_key_points TEXT,
      ai_confidence REAL,

      -- Phase 2 enrichment fields
      company TEXT,
      phrase_description TEXT,
      short_description TEXT,
      descriptor_string TEXT,
      phase2_completed INTEGER DEFAULT 0,

      -- Metadata
      content_type_code TEXT,

      -- iMessage tracking (for sync)
      imessage_rowid INTEGER UNIQUE,

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

  // iMessage Sync State
  db.exec(`
    CREATE TABLE IF NOT EXISTS sync_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      last_imessage_rowid INTEGER DEFAULT 0,
      last_sync_at TEXT
    )
  `);

  // Initialize sync_state if not exists
  try {
    const syncStateExists = db.prepare(`
      SELECT id FROM sync_state WHERE id = 1
    `).get();
    if (!syncStateExists) {
      db.prepare(`
        INSERT INTO sync_state (id, last_imessage_rowid, last_sync_at)
        VALUES (1, 0, NULL)
      `).run();
    }
  } catch (e) {
    console.log('sync_state already initialized or error:', e);
  }

  // FTS5 Full-Text Search virtual table for fast text search
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS nodes_fts USING fts5(
      title,
      ai_summary,
      source_url,
      descriptor_string,
      content='nodes',
      content_rowid='rowid'
    )
  `);

  // Triggers to keep FTS index in sync with nodes table
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_insert AFTER INSERT ON nodes BEGIN
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url, descriptor_string)
      VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url, NEW.descriptor_string);
    END
  `);

  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_delete AFTER DELETE ON nodes BEGIN
      INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url, descriptor_string)
      VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url, OLD.descriptor_string);
    END
  `);

  db.exec(`
    CREATE TRIGGER IF NOT EXISTS nodes_fts_update AFTER UPDATE ON nodes BEGIN
      INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url, descriptor_string)
      VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url, OLD.descriptor_string);
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url, descriptor_string)
      VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url, NEW.descriptor_string);
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
 * @deprecated - All content now comes from iMessage sync
 */
export function insertDefaultSegments(): void {
  console.log('Skipping default segments - all content comes from iMessage sync');
  // Default segments removed to keep database clean for iMessage imports only
}

/**
 * Insert default organizations
 * @deprecated - All content now comes from iMessage sync
 */
export function insertDefaultOrganizations(): void {
  console.log('Skipping default organizations - all content comes from iMessage sync');
  // Default organizations removed to keep database clean for iMessage imports only
}

/**
 * Initialize the database schema and default data
 */
export function initializeDatabase(): void {
  console.log('DEBUG: Checking if database initialized...');
  if (isDatabaseInitialized()) {
    console.log('Database already initialized');
    return;
  }

  console.log('Initializing database...');

  createTables();
  createIndexes();
  // Note: Default segments and organizations removed - all content will come from iMessage sync
  // insertDefaultSegments();
  // insertDefaultOrganizations();

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

  // Migration 3: Add Phase 2 enrichment columns to nodes table
  if (currentVersion < 3) {
    console.log('Running migration 3: Adding Phase 2 enrichment columns...');
    
    // Add new columns for Phase 2 data (SQLite doesn't support IF NOT EXISTS for columns)
    const columns = [
      { name: 'company', type: 'TEXT' },
      { name: 'phrase_description', type: 'TEXT' },
      { name: 'short_description', type: 'TEXT' },
      { name: 'descriptor_string', type: 'TEXT' },
      { name: 'phase2_completed', type: 'INTEGER DEFAULT 0' },
    ];

    for (const col of columns) {
      try {
        db.exec(`ALTER TABLE nodes ADD COLUMN ${col.name} ${col.type}`);
      } catch {
        // Column already exists, ignore
      }
    }

    // Update FTS5 to include descriptor_string for better search
    // Drop and recreate triggers to include descriptor_string
    db.exec(`DROP TRIGGER IF EXISTS nodes_fts_insert`);
    db.exec(`DROP TRIGGER IF EXISTS nodes_fts_delete`);
    db.exec(`DROP TRIGGER IF EXISTS nodes_fts_update`);

    // Recreate FTS5 table with descriptor_string
    db.exec(`DROP TABLE IF EXISTS nodes_fts`);
    db.exec(`
      CREATE VIRTUAL TABLE nodes_fts USING fts5(
        title,
        ai_summary,
        source_url,
        descriptor_string,
        content='nodes',
        content_rowid='rowid'
      )
    `);

    // Recreate triggers with descriptor_string
    db.exec(`
      CREATE TRIGGER nodes_fts_insert AFTER INSERT ON nodes BEGIN
        INSERT INTO nodes_fts(rowid, title, ai_summary, source_url, descriptor_string)
        VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url, NEW.descriptor_string);
      END
    `);

    db.exec(`
      CREATE TRIGGER nodes_fts_delete AFTER DELETE ON nodes BEGIN
        INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url, descriptor_string)
        VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url, OLD.descriptor_string);
      END
    `);

    db.exec(`
      CREATE TRIGGER nodes_fts_update AFTER UPDATE ON nodes BEGIN
        INSERT INTO nodes_fts(nodes_fts, rowid, title, ai_summary, source_url, descriptor_string)
        VALUES ('delete', OLD.rowid, OLD.title, OLD.ai_summary, OLD.source_url, OLD.descriptor_string);
        INSERT INTO nodes_fts(rowid, title, ai_summary, source_url, descriptor_string)
        VALUES (NEW.rowid, NEW.title, NEW.ai_summary, NEW.source_url, NEW.descriptor_string);
      END
    `);

    // Repopulate FTS index
    db.exec(`
      INSERT INTO nodes_fts(rowid, title, ai_summary, source_url, descriptor_string)
      SELECT rowid, title, ai_summary, source_url, descriptor_string FROM nodes
    `);

    console.log('Phase 2 enrichment columns migration complete');
    targetVersion = 3;
  }

  // Update schema version
  if (targetVersion > currentVersion) {
    db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES ('schema_version', ?)
    `).run(targetVersion.toString());

    console.log(`Schema migrated from version ${currentVersion} to ${targetVersion}`);
  }
}
