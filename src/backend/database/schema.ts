// ============================================================
// Database Schema
// ============================================================

import { getDatabase, isDatabaseInitialized } from './connection.js';

export function initializeDatabase(): void {
  if (isDatabaseInitialized()) {
    console.log('Database already initialized');
    return;
  }

  const db = getDatabase();

  db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      source_domain TEXT NOT NULL,
      date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
      company TEXT,
      phrase_description TEXT,
      short_description TEXT,
      logo_url TEXT,
      ai_summary TEXT,
      extracted_fields JSON,
      metadata_tags JSON DEFAULT '[]',
      function_parent_id TEXT,
      organization_parent_id TEXT,
      is_deleted INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS key_concepts (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL,
      concept TEXT NOT NULL,
      FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE,
      UNIQUE(node_id, concept)
    );

    CREATE TABLE IF NOT EXISTS segments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT UNIQUE,
      description TEXT,
      color TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT UNIQUE,
      description TEXT,
      color TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_nodes_function_parent ON nodes(function_parent_id);
    CREATE INDEX IF NOT EXISTS idx_nodes_organization_parent ON nodes(organization_parent_id);
    CREATE INDEX IF NOT EXISTS idx_nodes_deleted ON nodes(is_deleted);
    CREATE INDEX IF NOT EXISTS idx_key_concepts_node ON key_concepts(node_id);

    CREATE VIRTUAL TABLE IF NOT EXISTS nodes_fts USING fts5(
      title,
      source_domain,
      company,
      phrase_description,
      short_description,
      ai_summary,
      content='nodes',
      content_rowid='rowid'
    );
  `);

  console.log('Database schema initialized');
}

export function runMigrations(): void {
  // Migrations can be added here as the schema evolves
  console.log('Migrations completed');
}
