// ============================================================
// Node Database Operations
// ============================================================

import { getDatabase } from './connection';
import { v4 as uuidv4 } from 'uuid';
import { clearSearchCache } from './search';
import type {
  Node,
  CreateNodeInput,
  UpdateNodeInput,
  HierarchyView,
} from '@shared/types';

/**
 * Map database row to Node interface
 */
function mapRowToNode(row: Record<string, unknown>): Node {
  return {
    id: row.id as string,
    title: row.title as string,
    nodeType: row.node_type as Node['nodeType'],
    functionCode: row.function_code as string | null,
    organizationCode: row.organization_code as string | null,
    functionParentId: row.function_parent_id as string | null,
    organizationParentId: row.organization_parent_id as string | null,
    functionPosition: row.function_position as number,
    organizationPosition: row.organization_position as number,
    sourceUrl: row.source_url as string | null,
    faviconPath: row.favicon_path as string | null,
    thumbnailPath: row.thumbnail_path as string | null,
    aiSummary: row.ai_summary as string | null,
    aiKeyPoints: row.ai_key_points ? JSON.parse(row.ai_key_points as string) : null,
    aiConfidence: row.ai_confidence as number | null,
    contentTypeCode: row.content_type_code as Node['contentTypeCode'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    isDeleted: Boolean(row.is_deleted),
  };
}

/**
 * Create a new node
 */
export function createNode(input: CreateNodeInput): Node {
  const db = getDatabase();
  const id = uuidv4();
  const now = new Date().toISOString();

  // Get the max position for siblings
  let functionPosition = 0;
  let organizationPosition = 0;

  if (input.functionParentId) {
    const maxPos = db.prepare(`
      SELECT COALESCE(MAX(function_position), -1) + 1 as next_pos
      FROM nodes
      WHERE function_parent_id = ? AND is_deleted = 0
    `).get(input.functionParentId) as { next_pos: number };
    functionPosition = maxPos.next_pos;
  }

  if (input.organizationParentId) {
    const maxPos = db.prepare(`
      SELECT COALESCE(MAX(organization_position), -1) + 1 as next_pos
      FROM nodes
      WHERE organization_parent_id = ? AND is_deleted = 0
    `).get(input.organizationParentId) as { next_pos: number };
    organizationPosition = maxPos.next_pos;
  }

  db.prepare(`
    INSERT INTO nodes (
      id, title, node_type,
      function_parent_id, organization_parent_id,
      function_position, organization_position,
      source_url, content_type_code,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    input.title,
    input.nodeType,
    input.functionParentId ?? null,
    input.organizationParentId ?? null,
    functionPosition,
    organizationPosition,
    input.sourceUrl ?? null,
    input.contentTypeCode ?? null,
    now,
    now
  );

  // Clear search cache after creating new node
  clearSearchCache();

  return readNode(id)!;
}

/**
 * Read a node by ID
 */
export function readNode(id: string): Node | null {
  const db = getDatabase();

  const row = db.prepare(`
    SELECT * FROM nodes WHERE id = ? AND is_deleted = 0
  `).get(id) as Record<string, unknown> | undefined;

  if (!row) {
    return null;
  }

  return mapRowToNode(row);
}

/**
 * Update a node
 */
export function updateNode(id: string, input: UpdateNodeInput): Node {
  const db = getDatabase();
  const now = new Date().toISOString();

  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined) {
    updates.push('title = ?');
    values.push(input.title);
  }

  if (input.functionParentId !== undefined) {
    updates.push('function_parent_id = ?');
    values.push(input.functionParentId);
  }

  if (input.organizationParentId !== undefined) {
    updates.push('organization_parent_id = ?');
    values.push(input.organizationParentId);
  }

  if (input.functionPosition !== undefined) {
    updates.push('function_position = ?');
    values.push(input.functionPosition);
  }

  if (input.organizationPosition !== undefined) {
    updates.push('organization_position = ?');
    values.push(input.organizationPosition);
  }

  if (input.aiSummary !== undefined) {
    updates.push('ai_summary = ?');
    values.push(input.aiSummary);
  }

  if (input.aiKeyPoints !== undefined) {
    updates.push('ai_key_points = ?');
    values.push(JSON.stringify(input.aiKeyPoints));
  }

  if (input.aiConfidence !== undefined) {
    updates.push('ai_confidence = ?');
    values.push(input.aiConfidence);
  }

  if (updates.length > 0) {
    updates.push('updated_at = ?');
    values.push(now);
    values.push(id);

    db.prepare(`
      UPDATE nodes SET ${updates.join(', ')} WHERE id = ?
    `).run(...values);

    // Clear search cache after updating node
    clearSearchCache();
  }

  return readNode(id)!;
}

/**
 * Soft delete a node
 */
export function deleteNode(id: string): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE nodes SET is_deleted = 1, updated_at = ? WHERE id = ?
  `).run(now, id);

  // Clear search cache after deleting node
  clearSearchCache();
}

/**
 * Move a node to a new parent
 */
export function moveNode(
  id: string,
  newParentId: string,
  view: HierarchyView
): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Get the max position in the new parent
  const parentColumn = view === 'function' ? 'function_parent_id' : 'organization_parent_id';
  const positionColumn = view === 'function' ? 'function_position' : 'organization_position';

  const maxPos = db.prepare(`
    SELECT COALESCE(MAX(${positionColumn}), -1) + 1 as next_pos
    FROM nodes
    WHERE ${parentColumn} = ? AND is_deleted = 0
  `).get(newParentId) as { next_pos: number };

  db.prepare(`
    UPDATE nodes
    SET ${parentColumn} = ?, ${positionColumn} = ?, updated_at = ?
    WHERE id = ?
  `).run(newParentId, maxPos.next_pos, now, id);
}

/**
 * Get children of a node in a specific view
 */
export function getChildren(
  parentId: string | null,
  view: HierarchyView
): Node[] {
  const db = getDatabase();
  const parentColumn = view === 'function' ? 'function_parent_id' : 'organization_parent_id';
  const positionColumn = view === 'function' ? 'function_position' : 'organization_position';

  const query = parentId
    ? `SELECT * FROM nodes WHERE ${parentColumn} = ? AND is_deleted = 0 ORDER BY ${positionColumn}`
    : `SELECT * FROM nodes WHERE ${parentColumn} IS NULL AND is_deleted = 0 ORDER BY ${positionColumn}`;

  const rows = parentId
    ? db.prepare(query).all(parentId) as Record<string, unknown>[]
    : db.prepare(query).all() as Record<string, unknown>[];

  return rows.map(mapRowToNode);
}

/**
 * Get all nodes (for search/filtering)
 */
export function getAllNodes(): Node[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM nodes WHERE is_deleted = 0 ORDER BY created_at DESC
  `).all() as Record<string, unknown>[];

  return rows.map(mapRowToNode);
}

/**
 * Search nodes by title
 */
export function searchNodes(query: string): Node[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM nodes
    WHERE is_deleted = 0 AND title LIKE ?
    ORDER BY created_at DESC
  `).all(`%${query}%`) as Record<string, unknown>[];

  return rows.map(mapRowToNode);
}

/**
 * Find a node by its source URL (for duplicate detection)
 * Returns the existing node if found, null otherwise
 */
export function findNodeByUrl(url: string): Node | null {
  const db = getDatabase();

  const row = db.prepare(`
    SELECT * FROM nodes WHERE source_url = ? AND is_deleted = 0
  `).get(url) as Record<string, unknown> | undefined;

  if (!row) {
    return null;
  }

  return mapRowToNode(row);
}

/**
 * Find a node by normalized URL (removes tracking params, trailing slashes)
 * More robust duplicate detection
 */
export function findNodeByNormalizedUrl(normalizedUrl: string): Node | null {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT * FROM nodes WHERE source_url IS NOT NULL AND is_deleted = 0
  `).all() as Record<string, unknown>[];

  for (const row of rows) {
    const sourceUrl = row.source_url as string;
    if (normalizeUrlForComparison(sourceUrl) === normalizedUrl) {
      return mapRowToNode(row);
    }
  }

  return null;
}

/**
 * Normalize URL for comparison (removes tracking params, trailing slashes)
 */
function normalizeUrlForComparison(url: string): string {
  try {
    const urlObj = new URL(url);
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'ref', 'source', 'fbclid', 'gclid',
    ];
    trackingParams.forEach((param) => urlObj.searchParams.delete(param));
    let normalized = urlObj.toString();
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Get the path from root to a node in a specific view
 */
export function getNodePath(nodeId: string, view: HierarchyView): Node[] {
  const db = getDatabase();
  const parentColumn = view === 'function' ? 'function_parent_id' : 'organization_parent_id';
  const path: Node[] = [];

  let currentId: string | null = nodeId;

  while (currentId) {
    const row = db.prepare(`
      SELECT * FROM nodes WHERE id = ? AND is_deleted = 0
    `).get(currentId) as Record<string, unknown> | undefined;

    if (!row) break;

    path.unshift(mapRowToNode(row));
    currentId = row[parentColumn] as string | null;
  }

  return path;
}
