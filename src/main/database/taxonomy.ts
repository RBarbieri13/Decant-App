// ============================================================
// Taxonomy Database Operations
// ============================================================

import { getDatabase } from './connection';
import type {
  Node,
  TreeNode,
  Segment,
  Organization,
  HierarchyView,
  GumroadColor,
} from '@shared/types';
import { SEGMENT_COLORS, CONTENT_TYPE_COLORS } from '@shared/constants';

/**
 * Get all segments
 */
export function getSegments(): Segment[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT s.*, n.title
    FROM segments s
    JOIN nodes n ON s.id = n.id
    WHERE n.is_deleted = 0
    ORDER BY n.function_position
  `).all() as Array<{
    id: string;
    segment_code: string;
    segment_name: string;
    color: string | null;
    icon: string | null;
    title: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    segmentCode: row.segment_code as Segment['segmentCode'],
    segmentName: row.segment_name,
    color: (row.color || 'pink') as GumroadColor,
    icon: row.icon,
  }));
}

/**
 * Get all organizations
 */
export function getOrganizations(): Organization[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT o.*, n.title
    FROM organizations o
    JOIN nodes n ON o.id = n.id
    WHERE n.is_deleted = 0
    ORDER BY n.organization_position
  `).all() as Array<{
    id: string;
    org_code: string;
    org_name: string;
    logo_path: string | null;
    title: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    orgCode: row.org_code,
    orgName: row.org_name,
    logoPath: row.logo_path,
  }));
}

/**
 * Build a tree structure for a given view
 */
export function getTree(view: HierarchyView, rootId?: string): TreeNode[] {
  const db = getDatabase();
  const parentColumn = view === 'function' ? 'function_parent_id' : 'organization_parent_id';
  const positionColumn = view === 'function' ? 'function_position' : 'organization_position';

  // Build tree recursively
  function buildTree(parentId: string | null): TreeNode[] {
    const query = parentId
      ? `SELECT * FROM nodes WHERE ${parentColumn} = ? AND is_deleted = 0 ORDER BY ${positionColumn}`
      : `SELECT * FROM nodes WHERE ${parentColumn} IS NULL AND is_deleted = 0 ORDER BY ${positionColumn}`;

    const rows = parentId
      ? db.prepare(query).all(parentId) as Record<string, unknown>[]
      : db.prepare(query).all() as Record<string, unknown>[];

    return rows.map((row): TreeNode => {
      const nodeType = row.node_type as Node['nodeType'];
      const contentTypeCode = row.content_type_code as Node['contentTypeCode'];

      // Determine color based on node type
      let color: GumroadColor | undefined;
      if (nodeType === 'segment') {
        const segmentCode = row.function_code as string;
        color = SEGMENT_COLORS[segmentCode as keyof typeof SEGMENT_COLORS];
      } else if (nodeType === 'item' && contentTypeCode) {
        color = CONTENT_TYPE_COLORS[contentTypeCode];
      }

      return {
        id: row.id as string,
        title: row.title as string,
        nodeType,
        color,
        contentTypeCode,
        sourceUrl: row.source_url as string | null,
        faviconPath: row.favicon_path as string | null,
        children: buildTree(row.id as string),
        isExpanded: nodeType === 'segment' || nodeType === 'organization',
      };
    });
  }

  if (rootId) {
    // Get children of a specific root
    return buildTree(rootId);
  }

  // For function view, start with segments
  // For organization view, start with organizations
  if (view === 'function') {
    const segments = db.prepare(`
      SELECT n.* FROM nodes n
      JOIN segments s ON n.id = s.id
      WHERE n.is_deleted = 0
      ORDER BY n.function_position
    `).all() as Record<string, unknown>[];

    if (segments.length > 0) {
      return segments.map((row): TreeNode => {
        const segmentCode = (row.function_code || 'A') as keyof typeof SEGMENT_COLORS;
        return {
          id: row.id as string,
          title: row.title as string,
          nodeType: 'segment',
          color: SEGMENT_COLORS[segmentCode],
          children: buildTree(row.id as string),
          isExpanded: true,
        };
      });
    }

    // If no segments exist, show root-level items
    return buildTree(null);
  } else {
    const organizations = db.prepare(`
      SELECT n.* FROM nodes n
      JOIN organizations o ON n.id = o.id
      WHERE n.is_deleted = 0
      ORDER BY n.organization_position
    `).all() as Record<string, unknown>[];

    if (organizations.length > 0) {
      return organizations.map((row): TreeNode => ({
        id: row.id as string,
        title: row.title as string,
        nodeType: 'organization',
        color: 'blue', // Organizations use blue by default
        children: buildTree(row.id as string),
        isExpanded: true,
      }));
    }

    // If no organizations exist, show root-level items
    return buildTree(null);
  }
}

/**
 * Get a segment by code
 */
export function getSegmentByCode(code: string): Segment | null {
  const db = getDatabase();

  const row = db.prepare(`
    SELECT s.*, n.title
    FROM segments s
    JOIN nodes n ON s.id = n.id
    WHERE s.segment_code = ? AND n.is_deleted = 0
  `).get(code) as {
    id: string;
    segment_code: string;
    segment_name: string;
    color: string | null;
    icon: string | null;
    title: string;
  } | undefined;

  if (!row) return null;

  return {
    id: row.id,
    segmentCode: row.segment_code as Segment['segmentCode'],
    segmentName: row.segment_name,
    color: (row.color || 'pink') as GumroadColor,
    icon: row.icon,
  };
}

/**
 * Get an organization by code
 */
export function getOrganizationByCode(code: string): Organization | null {
  const db = getDatabase();

  const row = db.prepare(`
    SELECT o.*, n.title
    FROM organizations o
    JOIN nodes n ON o.id = n.id
    WHERE o.org_code = ? AND n.is_deleted = 0
  `).get(code) as {
    id: string;
    org_code: string;
    org_name: string;
    logo_path: string | null;
    title: string;
  } | undefined;

  if (!row) return null;

  return {
    id: row.id,
    orgCode: row.org_code,
    orgName: row.org_name,
    logoPath: row.logo_path,
  };
}
