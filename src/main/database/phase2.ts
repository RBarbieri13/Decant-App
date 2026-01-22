// ============================================================
// Phase 2 Database Operations
// ============================================================

import { getDatabase } from './connection';
import { v4 as uuidv4 } from 'uuid';
import { clearSearchCache } from './search';
import type {
  DeepAnalysisResult,
  MetadataTag,
  ExtractedField,
  ExtendedMetadataTagType,
} from '@shared/types';

/**
 * Save Phase 2 enrichment data to a node
 */
export function savePhase2Data(
  nodeId: string,
  deepAnalysis: DeepAnalysisResult,
  descriptorString: string,
  logoUrl: string | null
): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Update the node with Phase 2 data
  db.prepare(`
    UPDATE nodes SET
      title = COALESCE(?, title),
      company = ?,
      phrase_description = ?,
      short_description = ?,
      descriptor_string = ?,
      ai_summary = ?,
      ai_key_points = ?,
      phase2_completed = 1,
      updated_at = ?
    WHERE id = ?
  `).run(
    deepAnalysis.title || null,
    deepAnalysis.company || null,
    deepAnalysis.phraseDescription || null,
    deepAnalysis.shortDescription || null,
    descriptorString || null,
    deepAnalysis.shortDescription || null, // Use shortDescription as ai_summary
    JSON.stringify(deepAnalysis.keyConcepts || []),
    now,
    nodeId
  );

  // Save metadata codes to metadata_tags table
  saveMetadataCodes(nodeId, deepAnalysis.metadataCodes);

  // Save key concepts as extracted fields
  saveKeyConcepts(nodeId, deepAnalysis.keyConcepts);

  // Update favicon/logo if provided
  if (logoUrl) {
    db.prepare(`
      UPDATE nodes SET favicon_path = ? WHERE id = ? AND favicon_path IS NULL
    `).run(logoUrl, nodeId);
  }

  // Clear search cache since we updated node data
  clearSearchCache();
}

/**
 * Save metadata codes from Phase 2 analysis to metadata_tags table
 */
export function saveMetadataCodes(
  nodeId: string,
  metadataCodes: DeepAnalysisResult['metadataCodes']
): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  // First, delete existing metadata tags for this node
  db.prepare(`DELETE FROM metadata_tags WHERE node_id = ?`).run(nodeId);

  // Prepare insert statement
  const insertTag = db.prepare(`
    INSERT INTO metadata_tags (id, node_id, tag_type, tag_code, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Insert all metadata codes
  const tagTypes: ExtendedMetadataTagType[] = ['ORG', 'FNC', 'TEC', 'CON', 'IND', 'AUD', 'PRC', 'PLT'];

  for (const tagType of tagTypes) {
    const codes = metadataCodes[tagType as keyof typeof metadataCodes] || [];
    for (const code of codes) {
      if (code && code.trim()) {
        insertTag.run(uuidv4(), nodeId, tagType, code.trim(), now);
      }
    }
  }
}

/**
 * Save key concepts as extracted fields
 */
export function saveKeyConcepts(nodeId: string, keyConcepts: string[]): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Delete existing key_concept fields for this node
  db.prepare(`
    DELETE FROM extracted_fields WHERE node_id = ? AND field_name = 'key_concept'
  `).run(nodeId);

  // Insert new key concepts
  const insertField = db.prepare(`
    INSERT INTO extracted_fields (id, node_id, field_name, field_value, field_type, created_at)
    VALUES (?, ?, 'key_concept', ?, 'text', ?)
  `);

  for (const concept of keyConcepts || []) {
    if (concept && concept.trim()) {
      insertField.run(uuidv4(), nodeId, concept.trim(), now);
    }
  }
}

/**
 * Get all metadata tags for a node
 */
export function getMetadataTags(nodeId: string): MetadataTag[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM metadata_tags WHERE node_id = ? ORDER BY tag_type, tag_code
  `).all(nodeId) as Record<string, unknown>[];

  return rows.map((row) => ({
    id: row.id as string,
    nodeId: row.node_id as string,
    tagType: row.tag_type as MetadataTag['tagType'],
    tagCode: row.tag_code as string,
    createdAt: row.created_at as string,
  }));
}

/**
 * Get all extracted fields for a node
 */
export function getExtractedFields(nodeId: string): ExtractedField[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM extracted_fields WHERE node_id = ? ORDER BY field_name
  `).all(nodeId) as Record<string, unknown>[];

  return rows.map((row) => ({
    id: row.id as string,
    nodeId: row.node_id as string,
    fieldName: row.field_name as string,
    fieldValue: row.field_value as string | null,
    fieldType: row.field_type as ExtractedField['fieldType'],
    createdAt: row.created_at as string,
  }));
}

/**
 * Get nodes that need Phase 2 processing
 */
export function getNodesNeedingPhase2(limit = 10): string[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT id FROM nodes
    WHERE node_type = 'item'
      AND is_deleted = 0
      AND phase2_completed = 0
      AND source_url IS NOT NULL
    ORDER BY created_at ASC
    LIMIT ?
  `).all(limit) as { id: string }[];

  return rows.map((row) => row.id);
}

/**
 * Mark a node as Phase 2 complete (even if it failed, to prevent retries)
 */
export function markPhase2Complete(nodeId: string, success: boolean): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE nodes SET phase2_completed = ?, updated_at = ? WHERE id = ?
  `).run(success ? 1 : 0, now, nodeId);
}

/**
 * Get Phase 2 enrichment data for a node (for display in UI)
 */
export function getPhase2Data(nodeId: string): {
  metadataTags: MetadataTag[];
  extractedFields: ExtractedField[];
  keyConcepts: string[];
} {
  const metadataTags = getMetadataTags(nodeId);
  const extractedFields = getExtractedFields(nodeId);
  
  // Extract key concepts from extracted fields
  const keyConcepts = extractedFields
    .filter((f) => f.fieldName === 'key_concept')
    .map((f) => f.fieldValue)
    .filter((v): v is string => v !== null);

  return {
    metadataTags,
    extractedFields,
    keyConcepts,
  };
}

/**
 * Search nodes by metadata tag
 */
export function searchByMetadataTag(
  tagType: ExtendedMetadataTagType,
  tagCode: string
): string[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT DISTINCT node_id FROM metadata_tags
    WHERE tag_type = ? AND tag_code = ?
  `).all(tagType, tagCode) as { node_id: string }[];

  return rows.map((row) => row.node_id);
}

/**
 * Get all unique tag codes for a given tag type
 */
export function getUniqueTagCodes(tagType: ExtendedMetadataTagType): string[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT DISTINCT tag_code FROM metadata_tags
    WHERE tag_type = ?
    ORDER BY tag_code
  `).all(tagType) as { tag_code: string }[];

  return rows.map((row) => row.tag_code);
}
