// ============================================================
// Search Operations
// ============================================================

import { getDatabase } from './connection.js';

export function searchNodes(query: string, filters?: any): any[] {
  const db = getDatabase();

  // Simple text search across key fields
  const searchTerm = `%${query}%`;
  const nodes = db.prepare(`
    SELECT * FROM nodes
    WHERE is_deleted = 0 AND (
      title LIKE ? OR
      source_domain LIKE ? OR
      company LIKE ? OR
      short_description LIKE ? OR
      ai_summary LIKE ?
    )
    ORDER BY date_added DESC
    LIMIT 50
  `).all(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm) as any[];

  return nodes.map(node => ({
    ...node,
    extracted_fields: JSON.parse(node.extracted_fields || '{}'),
    metadata_tags: JSON.parse(node.metadata_tags || '[]'),
    key_concepts: db.prepare('SELECT concept FROM key_concepts WHERE node_id = ?').all(node.id).map((c: any) => c.concept),
  }));
}
